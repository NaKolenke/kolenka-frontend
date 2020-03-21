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
            <post-body v-if="!isEditing" class="mt-1 comment-body" :html="comment.text" />

            <div class="panel mt-2" v-if="isEditing">
              <h6 class="panel-header mb-0">
                Редактирование
                <button
                  class="btn btn-link btn-sm float-right tooltip"
                  @click="cancelEdit"
                  data-tooltip="Отменить"
                >
                  <i class="icon icon-cross"></i>
                </button>
              </h6>
              <div class="panel-body" style="overflow:visible">
                <comment-form :post-url="postUrl" :comment="comment" @sent="commentSent" />
              </div>
              <div class="panel-footer pb-0"></div>
            </div>

            <vote
              class="float-right"
              v-if="!isEditing"
              :rating="comment.rating"
              :votedUp="comment.user_voted > 0"
              :votedDown="comment.user_voted < 0"
              :id="comment.id"
              :type="'comment'"
            />

            <small class="subpanel text-gray" v-if="!isEditing">
              <a href="#" data-tooltip="Ответить" @click.prevent="reply">Ответить</a>
              <a v-if="canEdit(comment)" href="#" @click.prevent="edit">Редактировать</a>

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
          :user="user"
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
    'postUrl',
    'user'
  ],
  data () {
    return {
      active: false,
      isReplying: false,
      isEditing: false
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
    edit () {
      this.isEditing = true
    },
    cancelReply () {
      this.isReplying = false
    },
    cancelEdit () {
      this.isEditing = false
    },
    commentSent () {
      this.isReplying = false
      this.isEditing = false
    },
    canEdit (comment) {
      if (!this.user) {
        return false
      }
      if (this.user.id === comment.creator.id) {
        return true
      }
      if (this.user.is_admin) {
        return true
      }
      return false
    }
  },
  computed: {
    ...mapGetters({
      commentById: 'comments/byId',
      commentHasChilds: 'comments/hasChilds',
      commentChilds: 'comments/getChilds',
    }),
    commentId () {
      return 'comment_' + this.comment.id
    },
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
