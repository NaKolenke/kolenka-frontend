<template>
  <div class="tile">
    <div class="tile-icon">
      <avatar-view :user="comment.creator" :size="'sm'"></avatar-view>
    </div>
    <div class="tile-content">
      <p class="tile-title text-bold">{{ comment.creator.name }}</p>
      <p class="tile-subtitle">{{ comment.text }}</p>
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

