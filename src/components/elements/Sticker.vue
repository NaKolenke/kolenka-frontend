<template>
  <span class="sticker">
    <img :src="contentUrl" :alt="name" :title="name" />
    <p v-if="showName">{{name}}</p>
  </span>
</template>

<script>
export default {
  props: {
    name: String,
    showName: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentUrl () {
      return `${process.env.VUE_APP_API_URL}stickers/${this.name}/`
    }
  }
}
</script>

<style lang="scss" scoped>
.sticker {
  padding-left: 4px;
  padding-right: 4px;

  img {
    // width: 24px;
    height: 24px;
  }
}
</style>

