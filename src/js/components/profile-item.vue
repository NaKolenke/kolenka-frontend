<template>
  <div class="user columns column col-12 pt-2 mt-2">
    <div class="column col-2">
      <Avatar :user="user" :size="'lg'"></Avatar>
    </div>
    <div class="column col-7">
      <div>
        <router-link :to="{ name: 'profile', params: { user: user.login }}">{{user.login}}</router-link>
      </div>
      <div>{{user.name}}</div>
    </div>
    <div class="column col-3 col-ml-auto">{{user.last_active_date | moment }}</div>
  </div>
</template>

<script>
import Avatar from "./../components/avatar.vue";

export default {
  props: ["user"],
  components: {
    Avatar
  }
};
</script>

<style scoped>
.user {
  background: #ffffff;
  align-items: center;
}
</style>
