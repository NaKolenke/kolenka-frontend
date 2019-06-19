<template>
  <transition name="fade">
    <div v-if="isActive">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    title: String,
    active: Boolean
  },
  data() {
    return {
      isActive: this.active
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s;
}
.fade-leave-active {
  position: absolute;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
