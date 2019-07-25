<template>
  <div 
    class="side-block bg-secondary"
    :class="{ 'highlight': highlight }"
  >
    <h4 v-if="title" v-html="title"></h4>
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String, // Title of the block
    highlight: Boolean // Hightlight block with a border
  }
}
</script>

<style scoped>
.highlight {
  box-shadow: 0 0 0 2px #7977E1;
}

.side-block h4 {
  text-align: right;
}
</style>