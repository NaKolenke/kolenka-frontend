<template>
  <div class="popover" :class="'popover-' + popoverSide">
    <router-link :to="{ name: 'user', params: { user: user ? user.username : null }}">
      <figure
        class="avatar"
        :class="{ 'avatar-lg' : isLarge, 'avatar-sm' : isSmall, 'avatar-xl': isXl, 'badge': !!badge, 'av-badge': header }"
        :data-badge="badge"
      >
        <img v-if="user && user.avatar" :src="contentUrl" :alt="user.name" />
        <!-- yak -->
        <img v-else :src="stubUrl" :alt="user.name" />
      </figure>
    </router-link>
    <div v-if="user && card" class="popover-container">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">
            {{ user.name || user.username }}
            <span
              class="text-gray small"
            >{{ user.name ? user.username : "" }}</span>
          </div>
          <div class="card-subtitle text-gray small">Заходил: {{ user.last_active_date | moment }}</div>
        </div>
        <div
          v-if="user.about"
          class="card-body"
          v-html="user.about ? user.about.substring(0, 128) : ''"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object, // User object
    size: String, // Size of image: sm, lg, xl
    card: {
      type: Boolean,
      default: true // Show user info card
    },
    badge: [String, Number, Boolean], // Show small badge
    header: Boolean, // If we are inside the header
    popoverSide: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    isSmall () {
      return this.size === 'sm'
    },
    isLarge () {
      return this.size === 'lg'
    },
    isXl () {
      return this.size === 'xl'
    },
    contentUrl () {
      return process.env.VUE_APP_CONTENT_URL + '/' + this.user.avatar.id + '/'
    },
    stubUrl () {
      return `${process.env.VUE_APP_API_URL}stickers/avatar${Math.floor(Math.random() * 2) + 1}/`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../node_modules/spectre.css/src/_variables.scss";

.av-badge {
  background: none;
}

.av-badge[data-badge]::after {
  color: $dark-color;
  font-size: $unit-3;
  font-weight: bold;
}

.av-badge[data-badge]::after,
.av-badge:not([data-badge])::after {
  box-shadow: 0 0 0 0.1rem #323a45;
  background: $secondary-color;
}
</style>

