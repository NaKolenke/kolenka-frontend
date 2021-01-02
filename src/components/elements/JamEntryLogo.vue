<template>
  <router-link
    :to="{
      name: 'jam-entry',
      params: { jamUrl: entry.jam.url, entryUrl: entry.url },
    }"
  >
    <img v-if="entry && entry.logo" :src="contentUrl" :alt="entry.title" />
    <!-- yak -->
    <img v-else :src="stubUrl" :alt="entry.title" />
  </router-link>
</template>

<script>
export default {
  props: {
    entry: Object,
  },
  computed: {
    contentUrl () {
      return process.env.VUE_APP_CONTENT_URL + '/' + this.entry.logo.id + '/'
    },
    stubUrl () {
      return `${process.env.VUE_APP_API_URL}stickers/avatar${Math.floor(Math.random() * 2) + 1}/`
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  width: auto;
  height: 128px;
}
</style>

