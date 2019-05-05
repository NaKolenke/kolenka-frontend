<template>
  <div class="popover popover-right">
    <router-link :to="{ name: 'profile', params: { user: user.login }}">
      <figure class="avatar" v-bind:class="{  'avatar-lg' : isLarge, 'avatar-sm' : isSmall }">
        <img
          v-if="user.avatar"
          :src="'https://beta.kolenka.net/content/' + user.avatar.id + '/'"
          :alt="user.name"
        >
      </figure>
    </router-link>
    <div class="popover-container">
      <div class="card">
        <div class="card-header">
          <div class="card-title h5">{{ user.name }}</div>
          <div class="card-subtitle text-gray small">Последний визит: {{ user.last_active_date | moment }}</div>
        </div>
        <div class="card-body">
          {{ user.about ? user.about.substring(0, 128) : '' }}
        </div>
        <div class="card-footer">
          
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: ['user', 'size'],
  computed: {
    isSmall: function () {
      return this.size === 'sm'
    },
    isLarge: function () {
      return this.size === 'lg'
    }
  }
}
</script>
