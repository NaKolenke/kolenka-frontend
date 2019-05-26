<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div v-if="isLoading" class="column col-9">
        <loading-view></loading-view>
      </div>
      <div v-else id="content" class="users columns column col-8 mx-2 px-2">
        <div class="column col-8">Пользователь</div>
        <div class="column col-4 col-mr-auto">Последний раз был на сайте</div>
        <profile-list-item v-for="user in users" :key="user.id" :user="user"></profile-list-item>

        <pagination-view :page="page" :page-count="pageCount"></pagination-view>
      </div>

      <div id="sidebar" class="column col-3 hide-md">
        <the-sidebar></the-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileListItem from '@/components/ProfileListItem.vue'
import LoadingView from '@/components/LoadingView.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import PaginationView from '@/components/PaginationView.vue'
import UserService from '@/services/user'

export default {
  data: function () {
    this.users = []

    return {
      users: this.users,
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  created: function () {
    this.refreshPage(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage: function (route) {
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page
      UserService.getUsers(this.page).then(data => {
        this.users = data.users
        this.pageCount = data.meta.page_count
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative: function (offset) {
      this.$router.push({ name: 'users', query: { page: this.page + offset } })
    },
    paginateTo: function (page) {
      this.$router.push({ name: 'users', query: { page: page } })
    }
  },
  components: {
    ProfileListItem,
    TheSidebar,
    PaginationView,
    LoadingView
  }
}
</script>

<style scoped>
.users {
  background: #ffffff;
}

.user {
  border-bottom: 1px solid #cecece;
}
</style>
