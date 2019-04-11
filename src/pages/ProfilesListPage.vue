<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="users columns column col-8 mx-2 px-2">
          <div class="column col-8">Пользователь</div>
          <div class="column col-4 col-mr-auto">Последний раз был на сайте</div>
          <profile-list-item v-for="user in users" :key="user.id" :user="user"></profile-list-item>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileListItem from '@/components/ProfileListItem.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import UserService from '@/services/user'

export default {
  data: function () {
    this.users = []

    return {
      users: this.users
    }
  },
  created: function () {
    var page = this.$route.query.page || 1
    UserService.getUsers(page).then(data => {
      this.users = data.users
    })
  },
  components: {
    ProfileListItem,
    TheSidebar
  }
}
</script>

<style scoped>
.users {
  background: #ffffff;
}

.user {
  border-bottom: 1px solid #888;
}
</style>
