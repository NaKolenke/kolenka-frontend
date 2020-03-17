<template>
  <span v-if="justIcon &&achievement && achievement.image" class="m-1">
    <img :src="contentUrl" :alt="achievement.title" :title="achievement.title" />
  </span>
  <div v-else class="tile p-2 mt-2">
    <div class="tile-icon" v-if="achievement && achievement.image">
      <img :src="contentUrl" />
    </div>
    <div class="tile-content">
      <p class="tile-title">{{achievement.title}}</p>
      <post-body :html="achievement.comment" class="tile-subtitle" v-if="achievement.comment" />
    </div>

    <div></div>
  </div>
</template>

<script>
import PostBody from '@/components/PostBody.vue'

export default {
  props: {
    achievement: Object,
    justIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentUrl () {
      return process.env.VUE_APP_CONTENT_URL + '/' + this.achievement.image.id + '/'
    },
  },
  components: {
    PostBody,
  }
}
</script>

<style scoped>
img {
  max-width: 48px;
}
</style>
