<template>
  <div class="user column col-12 p-2">
    <div class="columns">
      <div class="column col-1">
        <avatar :user="user" :size="'lg'" :card="false" />
      </div>
      <div class="column col-7">
        <div v-if="user">
          <router-link :to="{ name: 'profile', params: { user: user.username }}">{{user.username}}</router-link>
        </div>
        <div>{{user.name}}</div>
      </div>
      <div class="column col-3">{{user.last_active_date | moment }}</div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/elements/Avatar.vue'

export default {
  props: ['user'],
  components: {
    Avatar
  }
}
</script>

<style scoped>
.user {
  align-items: center;
}
</style>
