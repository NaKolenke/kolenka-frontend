<template>
  <div class="popover popover-right">
    <router-link :to="{ name: 'profile', params: { user: user ? user.username : null }}">
      <figure class="avatar" :class="{ 'avatar-lg' : isLarge, 'avatar-sm' : isSmall, 'badge': badge, 'av-badge': true }">
        <img
          v-if="user && user.avatar"
          :src="'https://beta.kolenka.net/content/' + user.avatar.id + '/'"
          :alt="user.name"
        >
      </figure>
    </router-link>
    <div v-if="user && card" class="popover-container">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">{{ user.name || user.username }} <span class="text-gray small">{{ user.name ? user.username : "" }}</span></div>
          <div class="card-subtitle text-gray small">Заходил: {{ user.last_active_date | moment }}</div>
        </div>
        <div v-if="user.about" class="card-body" v-html="user.about ? user.about.substring(0, 128) : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    size: String,
    card: {
      type: Boolean,
      default: true
    },
    badge: Boolean
  },
  computed: {
    isSmall () {
      return this.size === 'sm'
    },
    isLarge () {
      return this.size === 'lg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/spectre.css/src/_variables.scss';

.av-badge[data-badge]::after,
.av-badge:not([data-badge])::after {
  box-shadow: 0 0 0 0.1rem #323A45;
  background: $secondary-color;
}
</style>

