<template>
  <div :class="['card', 'comment', { 'active': active }]" :id="commentId" @mouseover="onHover" @mouseleave="offHover">
    <div class="card-body">
      <div class="tile">
        <div class="tile-icon" style="position:relative">
          <avatar-view :user="comment.creator" :size="'sm'"></avatar-view>
        </div>
        <div class="tile-content p-relative">
          <div class="tile-title text-bold">
            {{ comment.creator.name || comment.creator.username }}
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
            <div class="panel-header h6">Ответ <button class="btn float-right" @click="cancelReply">Отменить</button></div>
            <div class="panel-body" style="overflow:visible"><comment-form :post-url="postUrl" :parent-id="comment.id"></comment-form></div>
            <div class="panel-footer"></div>
          </div>
        </div>
      </div>
    
      <div v-if="comment.children" style="padding-left: .4rem">
        <comment-card
          v-for="item in comment.children"
          :key="item.id" :comment="item" 
          :parent-id="comment.id" 
          :post-url="postUrl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView'
import CommentForm from '@/components/CommentForm'

export default {
  name: 'comment-card',
  props: [ 'comment', 'parentId', 'postUrl' ],
  data() {
    return {
      active: false,
      isReplying: false
    }
  },
  methods: {
    onHover() {
      this.active = true
    },
    offHover() {
      this.active = false
    },
    reply() {
      this.isReplying = true
    },
    cancelReply() {
      this.isReplying = false
    }
  },
  computed: {
    commentId() {
      return 'comment_' + this.comment.id
    }
  },
  components: {
    AvatarView,
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

.comment .active {
  border-color: blueviolet;
}

.comment-body p:last-child {
  margin: 0;
}

.comment-body img {
  width: auto !important;
}

.comment .reply {
  border: none;
  background: none;
  cursor: pointer;
}
</style>
