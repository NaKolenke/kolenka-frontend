<template>
  <div class="side-block bg-secondary">
    <h4 v-if="title" v-html="title"></h4>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped>
.side-block h4 {
  text-align: right;
}
</style>