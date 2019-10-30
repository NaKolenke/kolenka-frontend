<template>
  <button
    v-if="!dropdown"
    :class="[{ 'is-active': active }, 'button', { 'tooltip': name }, { 'tooltip-bottom': floats && name }]"
    @click="$emit('command')"
    :data-tooltip="name"
  >
    <slot></slot>
  </button>

  <div v-else class="dropdown">
    <button
      href="#"
      class="dropdown-toggle"
      tabindex="0"
      :class="[{ 'is-active': active }, 'button', { 'tooltip': name }, { 'tooltip-bottom': floats && name }]"
      :data-tooltip="name"
    >
      <slot />
    </button>
    <div class="menu">
      <slot name="dropdown"></slot>
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
@import "./node_modules/spectre.css/src/_variables.scss";

.dropdown {
  &.active .menu,
  .dropdown-toggle:hover + .menu,
  .menu:hover {
    display: block;
  }

  .menu {
    max-height: max-content;
    animation: slide-down 0.5s ease 1;
  }
}

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
