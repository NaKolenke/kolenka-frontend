<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <profile-view v-if="user.username" :user="user" :can-edit="canEdit"></profile-view>

          <div v-if="blogs.length > 0">
            <h3>Блоги пользователя</h3>
            <div class="columns blogs">
              <div class="column col-4" v-for="item in blogs" :key="item.id" style="margin-bottom: 10px">
                <blog-card-small :blog="item" style="height: 100%"></blog-card-small>
              </div>
            </div>
          </div>

          <div class="bottom-padd"></div>
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
import BlogCardSmall from '@/components/cards/BlogCardSmall.vue'
import UserService from '@/services/user'

export default {
  data: function () {
    return {
      user: {},
      blogs: []
    }
  },
  created: function () {
    this.refreshUser(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshUser(to)
    next()
  },
  methods: {
    refreshUser: function (route) {
      UserService.getUser(route.params.user).then(data => {
        this.user = data.user
      }).then(() => {
        return UserService.getUserBlogs(this.user.username)
      }).then(data => {
        this.blogs = data.blogs
      }).catch(err => {
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    }
  },
  computed: {
    canEdit: function () {
      if (!this.$meta.data.user) {
        return false
      }
      return this.user.id === this.$meta.data.user.id
    }
  },
  components: {
    ProfileView,
    TheSidebar,
    BlogCardSmall
  }
}
</script>
