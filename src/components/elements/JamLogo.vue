<template>
  <router-link :to="{ name: 'jam', params: { jamUrl: jam.url }}">
    <img v-if="jam && jam.logo" :src="contentUrl" :alt="jam.title" />
    <!-- yak -->
    <img v-else :src="stubUrl" :alt="jam.title" />
  </router-link>
</template>

<script>
export default {
  props: {
    jam: Object,
  },
  computed: {
    contentUrl () {
      return process.env.VUE_APP_CONTENT_URL + '/' + this.jam.logo.id + '/'
    },
    stubUrl () {
      return `${process.env.VUE_APP_API_URL}stickers/avatar${Math.floor(Math.random() * 2) + 1}/`
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: 128px;
  height: 128px;
}
</style>

