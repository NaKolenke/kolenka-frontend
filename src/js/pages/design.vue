<template>
  <div class="container">
    <div class="columns col-9 col-mx-auto row p-2 mt-2">
      <div class="col-3">Аватарки</div>
      <div class="col-1">
        <Avatar :user="user" :size="'lg'"></Avatar>
      </div>
      <div class="col-1">
        <Avatar :user="user" :size="'sm'"></Avatar>
      </div>
    </div>

    <div class="columns col-9 col-mx-auto row p-2 mt-2">
      <div class="col-3">Пользователи</div>
      <div class="col-5">
        <ProfileListItem :user="user" :size="'sm'"></ProfileListItem>
      </div>
      <div class="col-1">
        
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./../components/avatar.vue";
import ProfileListItem from "./../components/profile-item.vue";

export default {
  data: function() {
    this.user = {
      avatar: {
        id: 1
      },
      login: "test login",
      name: "test name",
      last_active_date: 1509900900
    };

    return {
      user: this.user
    };
  },
  created: function() {},
  components: {
    Avatar,
    ProfileListItem
  }
};
</script>

<style scoped>
.row {
  align-items: center;
  background-color: white;
}
</style>