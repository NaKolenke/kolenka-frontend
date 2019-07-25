<template>
  <button v-if="!dropdown"
    :class="[{ 'is-active': active }, 'button', { 'tooltip': name }, { 'tooltip-bottom': floats && name }]"
    @click="$emit('command')"
    :data-tooltip="name"
  >
    <slot />
  </button>

  <div v-else class="dropdown">
    <button
      :class="[{ 'is-active': active }, 'button', { 'tooltip': name }, 'dropdown-toggle', { 'tooltip-bottom': floats && name }]"
      :data-tooltip="name"
    >
      <slot />
    </button>
    <div class="menu">
      <slot name="dropdown" />
    </div>
  </div>
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
    floats: Boolean,
    dropdown: Boolean
  }
}
</script>

<style lang="scss" scoped>
@import './node_modules/spectre.css/src/_variables.scss';

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

.menu .button {
  width: 100%;
  text-align: left;
}
</style>
