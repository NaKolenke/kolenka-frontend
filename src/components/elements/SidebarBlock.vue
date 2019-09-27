<template>
  <div class="side-block" :class="{ 'highlight': highlight , 'bg-secondary': hasBg }">
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
    highlight: Boolean, // Hightlight block with a border
    hasBg: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "./node_modules/spectre.css/src/_variables.scss";

.highlight {
  box-shadow: 0 0 0 2px $primary-color;
}

.side-block h4 {
  text-align: right;
}
</style>
