<template>
  <div class="columns">

    <div class="column col-6 col-xl-12">
      <profile-view :user="user" :can-edit="canEdit"></profile-view>
    </div>
    
    <div class="column col-6 col-xl-12 mt-2">
      <template v-if="blogs.length > 0">
        <h3>Блоги пользователя</h3>
        <div class="columns blogs">
          
          <div v-if="auth.user && user.id !== auth.user.id" class="column col-6 col-xl-4 col-md-6 col-xs-12 mb-2">
            <router-link :to="{ name: 'invite-blog' }">
              <div class="card my-1 text-center">
                <div class="card-header">
                  <div class="card-title h5">
                    <i class="icon icon-3x icon-plus"></i>
                  </div>
                </div>
                
                <div class="card-body"><p>Пригласить в блог</p></div>
              </div>
            </router-link>
          </div>

          <div class="column col-6 col-xl-4 col-md-6 col-xs-12 mb-2" v-for="item in blogs" :key="item.id">
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
  metaInfo() {
    return {
      title: 'Профиль'
    }
  },
  data: function () {
    return {
      ...this.mapData({
        blogs: 'blogs/user',
        auth: 'auth/data'
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
