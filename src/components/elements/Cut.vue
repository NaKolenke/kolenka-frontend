<template>
  <router-link
    :to="{ name: 'post',  params: { post: url }}"
    class="btn btn-sm"
  >{{ name || 'Читать дальше' }}</router-link>
</template>

<script>
export default {
  props: {
    name: String, // cut name
    url: String // url to full post
  },
}
</script>

<style lang="scss" scoped>
</style>

