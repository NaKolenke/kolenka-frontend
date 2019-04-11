<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <profile-view v-if="user.name" :user="user"></profile-view>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileView from '@/components/ProfileView.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import UserService from '@/services/user'

export default {
  data: function () {
    this.user = {}

    return {
      user: this.user
    }
  },
  created: function () {
    UserService.getUser(this.$route.params.user).then(data => {
      this.user = data.user
    }).catch(err => {
      console.log(err)

      this.$router.replace({ path: '/404' })
    })
  },
  beforeRouteUpdate (to, from, next) {
    UserService.getUser(to.params.user).then(data => {
      this.user = data.user
      next()
    }).catch(err => {
      console.log(err)

      this.$router.replace({ path: '/404' })
    })
  },
  components: {
    ProfileView,
    TheSidebar
  }
}
</script>
