<template>
  <transition name="fade" @leave="animationLeave">
    <div class="container" :style="{ bottom: y + 'px' }" v-if="!isClosing">
      <div class="toast" :class="toastClass">
        <button class="btn btn-clear float-right" @click="close()"></button>
        <slot/>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    y: Number,
    isError: Boolean
  },
  data: () => ({
    isClosing: false
  }),
  methods: {
    close () {
      this.isClosing = true
    },
    animationLeave(el, done) {
      this.$toast.hide(this)
    }
  },
  computed: {
    toastClass () {
      return this.isError ? "toast-error" : "toast-success"
    }
  }
}
</script>

<style scoped>
.container {
  position: fixed;
  right: 0;
  max-width: 300px;
  transition: all 0.5s linear;
  animation: 0.2s ease-out 0s 1 slideInFromLeft;
}

.toast {
  margin-bottom: 16px;
  padding: 8px;
}

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
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
