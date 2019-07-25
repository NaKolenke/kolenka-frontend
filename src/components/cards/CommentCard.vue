<template>
  <div class="card comment" :id="commentId">
    <div class="card-body">
      <div class="tile">
        <div class="tile-icon" style="position:relative">
          <avatar :user="comment.creator" :size="'sm'" />
        </div>
        
        <div class="tile-content p-relative">
          <div class="tile-title text-bold">
            <router-link :to="{ name: 'profile', params: { user: comment.creator.username }}" class="text-dark">{{ comment.creator.name || comment.creator.username }}</router-link>
            <br>
            <small class="text-gray">{{ comment.created_date | moment}} <a :href="'#' + commentId" title="Ссылка на комментарий">#</a></small>
          </div>
          <div class="tile-subtitle mt-1 comment-body" v-html="comment.text"></div>
          <small class="p-absolute" style="right: 0;bottom: 0" v-if="!isReplying">
            <button class="reply tooltip" data-tooltip="Ответить" @click="reply">
              <span class="icon-bubble2"></span>
            </button>
          </small>
          <div class="panel mt-2 mb-2" v-if="isReplying">
            <div class="panel-header h6">Ответ <button class="btn btn-link btn-sm float-right tooltip" @click="cancelReply" data-tooltip="Отменить"><i class="icon icon-cross"></i></button></div>
            <div class="panel-body" style="overflow:visible"><comment-form :post-url="postUrl" :parent-id="comment.id" @sent="commentSent"></comment-form></div>
            <div class="panel-footer"></div>
          </div>
        </div>
      </div>
    
      <div v-if="comment.children" style="padding-left: .4rem">
        <comment-card
          v-for="item in comment.children"
          :key="item" :comment="$comments.findById(item)" 
          :parent-id="comment.id" 
          :post-url="postUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/elements/Avatar.vue'
import CommentForm from '@/components/CommentForm.vue'
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
  data() {
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
      this.isReplying = true
    },
    cancelReply () {
      this.isReplying = false
    },
    commentSent() {
      this.isReplying = false
    }
  },
  computed: {
    commentId () {
      return 'comment_' + this.comment.id
    }
  },
  components: {
    Avatar,
    CommentForm
  }
}
</script>

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

.comment .reply {
  border: none;
  background: none;
  cursor: pointer;
}
</style>
