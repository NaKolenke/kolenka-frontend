<template>
  <transition name="fade">
    <div class="toast" :class="toastClass" :style="{ bottom: y + 'px' }">
      <button class="btn btn-clear float-right" @click="close()"></button>
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    y: Number,
    isError: Boolean
  },
  methods: {
    close () {
      this.$toast.hide(this)
    }
  },
  computed: {
    toastClass  () {
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
  transition: all 1s linear;
  animation: 0.2s ease-out 0s 1 slideInFromLeft;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes slideInFromLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
