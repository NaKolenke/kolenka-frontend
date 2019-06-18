<template>
  <div :class="{ 'd-none': !isActive }">
    <slot />
  </div>
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
