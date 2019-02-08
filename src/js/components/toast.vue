<template>
  <div class="toast" v-bind:style="{ bottom: y + 'px' }">
    <button class="btn btn-clear float-right" v-on:click="close()"></button>
    <slot />
  </div>
</template>

<style scoped>
.toast {
  position: absolute;
  right: 0;
  width: 300px;
}
</style>

<script>
export default {
  props: {
    y: Number
  },
  methods: {
    close: function() {
      this.$root.hideToast(this)
    }
  }
}
</script>
