<template>
  <div>
    <img :src="contentUrl" :alt="name" >
  </div>
</template>

<script>
export default {
  props: {
    id: Number, 
    name: String
  },
  computed: {
    contentUrl() {
      return process.env.VUE_APP_CONTENT_URL + '/' + this.id + '/'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

