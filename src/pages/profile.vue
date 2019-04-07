<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <!-- <ProfileView :user="user"></ProfileView> -->
        </div>

        <!-- <div id="sidebar" class="column col-3 hide-md">
          <SidebarBlock></SidebarBlock>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import ProfileView from '@/components/profile.vue'
// import SidebarBlock from '@/components/sidebar-block.vue'
import userService from '@/services/user'

export default {
  data: function () {
    this.user = {}

    return {
      user: this.user
    }
  },
  created: function () {
    userService.getUser(this.$route.params.user).then(data => {
      this.user = data.user
    }).catch(err => {
      console.log(err)

      this.$router.replace({ path: '/404' })
    })
  },
  components: {
    // ProfileView
    // SidebarBlock
  }
}
</script>
