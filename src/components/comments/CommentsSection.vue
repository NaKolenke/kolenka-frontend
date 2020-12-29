<template>
  <div id="comments_container">
    <h3 v-if="showHeader" id="comments">
      Комментарии
      <small class="text-gray">{{ commentsCount }}</small>
    </h3>
    <comment-form
      v-if="user"
      :post-url="postUrl"
      :jam-url="jamUrl"
      :jam-entry-url="jamEntryUrl"
      @sent="addComment"
    ></comment-form>
    <div v-if="user" class="mt-2"></div>
    <template v-if="loading.comments">
      <comment-skeleton />
    </template>
    <comment-card
      v-else
      v-for="item in comments"
      :key="item.id"
      :comment="item"
      :post-url="postUrl"
      :jam-url="jamUrl"
      :jam-entry-url="jamEntryUrl"
      :user="user"
    ></comment-card>
    <div class="bottom-padd"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import errors from '@/utils/errors'
import Pagination from '@/models/pagination'

import CommentCard from '@/components/cards/CommentCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import CommentSkeleton from '@/components/skeletons/Comment.vue'

export default {
  props: {
    postUrl: {
      type: String,
      required: false
    },
    jamUrl: {
      type: String,
      required: false
    },
    jamEntryUrl: {
      type: String,
      required: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
  },
  data: function () {
    return {
      loading: {
        comments: true,
      }
    }
  },
  mounted: function () {
    this.refreshComments()
  },
  methods: {
    refreshComments () {
      this.loading.comments = true

      var type = 'post'
      var url = null
      var suburl = null

      if (this.postUrl) {
        type = 'post'
        url = this.postUrl
      } else if (this.jamEntryUrl) {
        type = 'jam-entry'
        url = this.jamUrl
        suburl = this.jamEntryUrl
      } else if (this.jamUrl) {
        type = 'jam'
        url = this.jamUrl
      }

      return this.$store.dispatch('comments/getComments', { url: url, suburl: suburl, type: type, pagination: new Pagination(1) })
        .then(_res => {
          this.loading.comments = false
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    addComment (id) {
      this.$nextTick(() => {
        this.$scrollTo('#comment_' + id, 1000, { cancelable: true })
      })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
    }),
    ...mapGetters({
      commentsCount: 'comments/commentsCount',
      comments: 'comments/topLevelComments',
    })
  },
  components: {
    CommentSkeleton,
    CommentCard,
    CommentForm

  }
}
</script>
