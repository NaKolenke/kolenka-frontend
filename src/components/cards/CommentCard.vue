<template>
  <div class="card comment" :id="commentId">
    <div class="card-body">
      <div class="tile">
        <div class="tile-icon" style="position:relative">
          <avatar :user="comment.creator" :size="'sm'" />
        </div>

        <div class="tile-content p-relative">
          <div class="tile-title text-bold">
            <router-link
              :to="{ name: 'user', params: { user: comment.creator.username }}"
              class="text-dark"
            >{{ comment.creator.name || comment.creator.username }}</router-link>
          </div>

          <div class="tile-subtitle">
            <post-body class="mt-1 comment-body" :html="comment.text" />

            <vote
              class="float-right"
              :rating="comment.rating"
              :votedUp="comment.user_voted > 0"
              :votedDown="comment.user_voted < 0"
              :id="comment.id"
              :type="'comment'"
            />

            <small class="subpanel text-gray">
              <a href="#" data-tooltip="Ответить" @click.prevent="reply">Ответить</a>

              <span>{{ comment.created_date | moment}}</span>
              <a :href="'#' + commentId" title="Ссылка на комментарий">#</a>
            </small>
          </div>

          <div class="panel mt-2" v-if="isReplying">
            <h6 class="panel-header mb-0">
              Ответ
              <button
                class="btn btn-link btn-sm float-right tooltip"
                @click="cancelReply"
                data-tooltip="Отменить"
              >
                <i class="icon icon-cross"></i>
              </button>
            </h6>
            <div class="panel-body" style="overflow:visible">
              <comment-form :post-url="postUrl" :parent-id="comment.id" @sent="commentSent" />
            </div>
            <div class="panel-footer pb-0"></div>
          </div>
        </div>
      </div>

      <div v-if="commentHasChilds(comment.id)" style="padding-left: .4rem">
        <comment-card
          v-for="item in commentChilds(comment.id)"
          :key="item.id"
          :comment="item"
          :post-url="postUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/elements/Avatar.vue'
import CommentForm from '@/components/CommentForm.vue'
import PostBody from '@/components/PostBody.vue'
import Vote from '@/components/Vote.vue'
import wrapCode from '@/utils/wrapCode'
import wrapYoutube from '@/utils/wrapYoutube'
import resizeTweet from '@/utils/resizeTweet'

export default {
  name: 'comment-card',
  props: [
    'comment',
    'parentId',
    'postUrl'
  ],
  data () {
    return {
      active: false,
      isReplying: false
    }
  },
  mounted () {
    if (this.$el.querySelectorAll) {
      wrapCode(this.$el)
      wrapYoutube(this.$el, this)
      resizeTweet(this.$el)
    }
  },
  methods: {
    reply () {
      this.isReplying = !this.isReplying
    },
    cancelReply () {
      this.isReplying = false
    },
    commentSent () {
      this.isReplying = false
    }
  },
  computed: {
    commentId () {
      return 'comment_' + this.comment.id
    },
    ...mapGetters({
      commentById: 'comments/byId',
      commentHasChilds: 'comments/hasChilds',
      commentChilds: 'comments/getChilds',
    })
  },
  components: {
    Avatar,
    CommentForm,
    PostBody,
    Vote,
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

.subpanel * {
  padding-right: $control-padding-x;
}
</style>

<style>
.comment {
  border-top: none;
  border-right: none;
  border-bottom: none;
}

.comment > .card-body {
  padding-right: 0;
}

.comment > .card-body:last-child {
  padding-bottom: 0;
}

.comment-body p:last-child {
  margin: 0;
}

.comment-body img {
  max-width: 100%;
}
</style>
