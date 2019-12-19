<template>
  <div>
    <template v-if="isLoading">
      <user-skeleton v-for="i in 20" :key="i" />
    </template>

    <table v-else class="table">
      <thead>
        <tr>
          <th>Пользователь</th>
          <th>Последний раз был на сайте</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>
            <div class="columns">
              <div class="column col-2 col-md-4 col-lg-3">
                <avatar :user="user" :size="'lg'" :card="false" />
              </div>
              <div class="column col-10 col-md-8 col-lg-9">
                <router-link
                  :to="{ name: 'user', params: { user: user.username }}"
                >{{user.username}}</router-link>
                <div>{{user.name}}</div>
              </div>
            </div>
          </td>
          <td>{{user.last_active_date | moment }}</td>
        </tr>
      </tbody>
    </table>

    <pagination-view :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import Avatar from '@/components/elements/Avatar.vue'
import UserSkeleton from '@/components/skeletons/UserListItem.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Пользователи'
    }
  },
  data () {
    return {
      users: [],
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  created () {
    this.refreshPage(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage (route) {
      this.users = []
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$store.dispatch('users/getAll', { pagination: new Pagination(this.page) })
        .then(res => {
          this.users = res.users
          this.pageCount = res.meta.page_count
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'users', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'users', query: { page: page } })
    }
  },
  components: {
    PaginationView,
    Avatar,
    UserSkeleton
  }
}
</script>
