<template>
  <div class="columns" v-if="user">
    <div class="column col-3">
      <div class="panel">
        <div class="panel-header">
          <user-header :user="user" :can-edit="canEdit"></user-header>
        </div>
        <div class="panel-body mb-2">
          <user-page-menu :user="user" @navTo="navTo"></user-page-menu>
        </div>
      </div>
    </div>

    <div class="column col-9">
      <template v-if="currentTab == 0">
        <user-page-about :user="user" />
      </template>

      <template v-if="currentTab == 1">
        <user-page-achievements :user="user" />
      </template>

      <template v-if="currentTab == 2">
        <user-page-blogs :user="user" />
      </template>

      <template v-if="currentTab == 3">
        <user-page-posts :user="user" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserHeader from '@/components/users/UserHeader.vue'
import UserPageMenu from '@/components/users/UserPageMenu.vue'
import UserPageAbout from '@/components/users/UserPageAbout.vue'
import UserPageAchievements from '@/components/users/UserPageAchievements.vue'
import UserPageBlogs from '@/components/users/UserPageBlogs.vue'
import UserPagePosts from '@/components/users/UserPagePosts.vue'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Профиль'
    }
  },
  data: function () {
    return {
      user: null,
      currentTab: 0
    }
  },
  created: function () {
    this.refreshUser(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.currentTab = 0
    this.refreshUser(to)
    next()
  },
  methods: {
    refreshUser (route) {
      this.$store.dispatch('users/getUser', { username: route.params.user })
        .then(user => {
          this.user = user
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    navTo (index) {
      this.currentTab = index
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
    UserHeader,
    UserPageMenu,
    UserPageAbout,
    UserPageAchievements,
    UserPageBlogs,
    UserPagePosts,
  }
}
</script>
