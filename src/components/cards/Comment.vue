<template>
  <div class="card mt-2">
    <div class="card-body">
      <div class="tile">
        <div class="tile-icon">
          <avatar-view :user="comment.creator" :size="'sm'"></avatar-view>
        </div>
        <div class="tile-content">
          <div class="tile-title text-bold">{{ comment.creator.name || comment.creator.login }}</div>
          <div class="tile-subtitle mt-1 comment-body" v-html="comment.text"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'

export default {
  props: [ 'comment' ],
  components: {
    AvatarView
  }
}
</script>

<style>
.comment-body p:last-child {
  margin: 0;
}
</style>
