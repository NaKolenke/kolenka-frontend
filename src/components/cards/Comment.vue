<template>
  <div :class="['card', 'comment', { 'active': active }]" @mouseover="onHover" @mouseleave="offHover">
    <div class="card-body">
      <div class="tile">
        <div class="tile-icon">
          <avatar-view :user="comment.creator" :size="'sm'"></avatar-view>
        </div>
        <div class="tile-content">
          <div class="tile-title text-bold">{{ comment.creator.name || comment.creator.username }}</div>
          <div class="tile-subtitle mt-1 comment-body" v-html="comment.text"></div>
        </div>
      </div>
    
      <div v-if="comment.children">
        <comment-card v-for="item in comment.children" :key="item.id" :comment="item"></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'

export default {
  name: 'comment-card',
  props: [ 'comment' ],
  data() {
    return {
      active: false
    }
  },
  methods: {
    onHover() {
      this.active = true
    },
    offHover() {
      this.active = false
    }
  },
  components: {
    AvatarView
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
</style>
