<template>
  <div class="toast toast-success" v-bind:style="{ bottom: y + 'px' }">
    <button class="btn btn-clear float-right" v-on:click="close()"></button>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    y: Number
  },
  methods: {
    close: function () {
      this.$root.hideToast(this)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  right: 0;
  width: 300px;
  margin: 24px;
  padding: 8px;
}
</style>
