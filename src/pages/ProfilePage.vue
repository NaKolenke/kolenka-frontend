<template>
  <div class="columns">

    <div class="column col-6 col-xl-12">
      <profile-view :user="user" :can-edit="canEdit"></profile-view>
    </div>
    
    <div class="column col-6 col-xl-12">
      <template v-if="blogs.length > 0">
        <h3>Блоги пользователя</h3>
        <div class="columns blogs">
          <div class="column col-6 col-xl-4" v-for="item in blogs" :key="item.id" style="margin-bottom: 10px">
            <blog-card-small :blog="item" style="height: 100%"></blog-card-small>
          </div>
        </div>
      </template>
    </div>
    
  </div>
</template>

<script>
import ProfileView from '@/components/ProfileView.vue'
import BlogCardSmall from '@/components/cards/BlogCardSmall.vue'

export default {
  data: function () {
    return {
      ...this.mapData({
        blogs: 'blogs/user'
      }),
      user: {}
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
    refreshUser (route) {      
      this.$blogs.indexes.user = []
      
      this.$users
      .getUser(route.params.user)
      .then(user => {
        this.user = user
      })
      .then(() => this.$blogs.getUserBlogs(route.params.user, { page: 1 }, false))
      .catch(err => {
        console.log(err)
        this.$router.push({ path: '/404' })
      })
    }
  },
  computed: {
    canEdit () {
      if (!this.$auth.data.user) {
        return false
      }
      return this.user.id === this.$auth.data.user.id
    }
  },
  components: {
    ProfileView,
    BlogCardSmall
  }
}
</script>
