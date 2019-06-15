<template>
  <button
    :class="[{ 'is-active': active }, 'button', { 'tooltip': name }, { 'tooltip-bottom': floats && name }]"
    @click="command"
    :data-tooltip="name"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    name: String,
    command: Function,
    active: Boolean,
    floats: Boolean
  }
}
</script>
