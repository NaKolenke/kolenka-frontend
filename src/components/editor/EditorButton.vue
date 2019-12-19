<template>
  <button
    :class="[{ 'is-active': active }, 'button', { 'tooltip': name }]"
    @click="$emit('command')"
    :data-tooltip="name"
  >
    <slot></slot>
  </button>
</template>

<script>
/*
  Events:
    @command
*/

export default {
  props: {
    name: String,
    active: Boolean,
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

.button {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  padding: 2px 10px;
  border-radius: 3px;
}

.button:hover,
.button.is-active {
  background: $primary-color;
  color: $secondary-color;
}
</style>
