<template>
  <div class="columns">
    <div
      class="column col-xl-12"
      :class="{ 'col-12': blogs.length === 0, 'col-6': blogs.length > 0 }"
    >
      <user-view :user="user" :can-edit="canEdit"></user-view>
    </div>

    <div v-if="blogs.length > 0" class="column col-6 col-xl-12 mt-2">
      <template>
        <h3>Блоги пользователя</h3>
        <div class="columns blogs">
          <div v-if="me && user.id !== me.id" class="column col-6 col-xl-4 col-md-6 col-xs-12 mb-2">
            <router-link :to="{ name: 'invite-blog' }">
              <div class="card my-1 text-center">
                <div class="card-header">
                  <div class="card-title h5">
                    <i class="icon icon-3x icon-plus"></i>
                  </div>
                </div>

                <div class="card-body">
                  <p>Пригласить в блог</p>
                </div>
              </div>
            </router-link>
          </div>

          <div
            class="column col-6 col-xl-4 col-md-6 col-xs-12 mb-2"
            v-for="item in blogs"
            :key="item.id"
          >
            <blog-card-small :blog="item" style="height: 100%"></blog-card-small>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserView from '@/components/UserView.vue'
import BlogCardSmall from '@/components/cards/BlogCardSmall.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Профиль'
    }
  },
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
    refreshUser (route) {
      this.blogs = []
      this.$store.dispatch('users/getUser', { username: route.params.user })
        .then(user => {
          this.user = user
        })
        .then(() => this.$store.dispatch('blogs/getUserBlogs', { username: route.params.user, pagination: new Pagination(this.page) }))
        .then(res => {
          this.blogs = res.blogs
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    canEdit () {
      if (!this.me) {
        return false
      }
      return this.user.id === this.me.id
    },
    ...mapState({
      me: state => state.users.me
    }),
  },
  components: {
    UserView,
    BlogCardSmall
  }
}
</script>
