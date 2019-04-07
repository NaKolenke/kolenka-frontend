<template>
  <div class="user column col-12 p-2">
    <div class="columns">
      <div class="column col-1">
        <Avatar :user="user" :size="'lg'"></Avatar>
      </div>
      <div class="column col-7">
        <div v-if="user">
          <router-link :to="{ name: 'profile', params: { user: user.login }}">{{user.login}}</router-link>
        </div>
        <div>{{user.name}}</div>
      </div>
      <div class="column col-3">{{user.last_active_date | moment }}</div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/avatar.vue'

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
