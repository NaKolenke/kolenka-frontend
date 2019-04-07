<template>
  <router-link :to="{ name: 'profile', params: { user: user.login }}">
  <figure class="avatar" v-bind:class="{  'avatar-lg' : isLarge, 'avatar-sm' : isSmall }">
    <img
      v-if="user.avatar"
      :src="'https://beta.kolenka.net/content/' + user.avatar.id + '/'"
      :alt="user.name"
    >
  </figure>
  </router-link>
</template>

<script>
export default {
  props: ["user", "size"],
  computed: {
    isSmall: function() {
      return this.size == "sm"
    },
    isLarge: function() {
      return this.size == "lg"
    }
  }
};
</script>
