<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="columns column col-9">
          <div class="column col-9">
            Пользователь
          </div>
          <div class="column col-3 col-mr-auto">
            Последний раз был на сайте
          </div>
          <ProfileListItem v-for="user in users" :key="user.id" :user="user"></ProfileListItem>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <SidebarBlock :version="version"></SidebarBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileListItem from "./../components/profile-item.vue";
import SidebarBlock from "./../components/sidebar-block.vue";
import userService from "./../services/user";
import config from "./../config.json";

export default {
  data: function() {
    this.users = [];

    return {
      users: this.users,
      version: config.version
    };
  },
  created: function() {
    var page = this.$route.query.page || 1;
    userService.getUsers(page)
      .then(data => {
        this.users = data.users;
      });
  },
  components: {
    ProfileListItem,
    SidebarBlock
  }
};
</script>

