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
              <div class="column col-2 col-md-4">
                <avatar :user="user" :size="'lg'" :card="false" />
              </div>
              <div class="column col-10 col-md-8">
                <router-link :to="{ name: 'profile', params: { user: user.username }}">{{user.username}}</router-link>
                <div>{{user.name}}</div>
              </div>
            </div>
          </td>
          <td>
            {{user.last_active_date | moment }}
          </td>
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

export default {
  metaInfo() {
    return {
      title: 'Пользователи'
    }
  },
  data () {
    return {
      ...this.mapData({
        users: 'users/everything'
      }),
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
      this.$users.purge()
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$users.getAll({ page: this.page }).then(pages => {
        this.pageCount = pages
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
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
