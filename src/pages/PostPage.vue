<template>
  <div>
    <template v-if="loading.post">
      <post-skeleton />
    </template>
    <post-view v-else :post="post" :cut="false"></post-view>

    <div id="comments_container" v-if="!post.is_draft">
      <h3 id="comments">
        Комментарии
        <small class="text-gray">{{ commentsCount }}</small>
      </h3>
      <comment-form v-if="user" :post-url="post.url" @sent="addComment"></comment-form>
      <div v-if="user" class="mt-2"></div>
      <template v-if="loading.comments">
        <comment-skeleton />
      </template>
      <comment-card
        v-else
        v-for="item in comments"
        :key="item.id"
        :comment="item"
        :post-url="post.url"
      ></comment-card>
      <div class="bottom-padd"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'
import Pagination from '@/models/pagination'
import PostView from '@/components/PostView.vue'
import CommentCard from '@/components/cards/CommentCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import CommentSkeleton from '@/components/skeletons/Comment.vue'

export default {
  metaInfo () {
    return {
      title: 'Запись'
    }
  },
  data: function () {
    return {
      post: {},
      comments: [],
      commentsCount: 0,
      loading: {
        comments: true,
        post: true
      }
    }
  },
  mounted () {
    this.refreshPost(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPost(to)
    next()
  },
  methods: {
    refreshPost (route) {
      this.$store.dispatch('posts/getPost', { url: route.params.post })
        .then(post => {
          this.post = post
          this.loading.post = false
        })
        .then(() => this.refreshComments(route))
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
          this.$router.push({ path: '/404' })
        })
    },
    refreshComments (route) {
      this.comments = []

      return this.$store.dispatch('comments/getComments', { url: route.params.post, pagination: new Pagination(1) })
        .then(res => {
          this.comments = res
          this.commentsCount = res.length
          this.loading.comments = false
        }).catch(err => {
          console.log(err)
        })
    },
    addComment (id) {
      this.commentsCount++
      this.$nextTick(() => {
        this.$scrollTo('#comment_' + id, 1000, { cancelable: true })
      })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
  },
  components: {
    PostView,
    CommentCard,
    CommentForm,
    PostSkeleton,
    CommentSkeleton
  }
}
</script>

<style scoped>
.relevant {
  list-style: none;
  margin: 0;
}

.relevant li {
  margin-top: 0;
  margin-bottom: 0.4rem;
}
</style>

<style>
#comments_container > .comment {
  border: none;
}
#comments_container > .comment > .card-body {
  padding-left: 0;
}
</style>

