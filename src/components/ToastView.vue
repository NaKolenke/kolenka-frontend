<template>
  <div class="toast" :class="toastClass" v-bind:style="{ bottom: y + 'px' }">
    <button class="btn btn-clear float-right" v-on:click="close()"></button>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    y: Number,
    isError: Boolean
  },
  methods: {
    close: function () {
      this.$Toast.hide(this)
    }
  },
  computed: {
    toastClass: function  () {
      if (this.isError) {
        return "toast-error"
      }
      return "toast-success"
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
