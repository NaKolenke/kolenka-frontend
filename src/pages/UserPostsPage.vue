<template>
  <div>
    <h3>
      Записи пользователя
      <router-link
        :to="{ name: 'user', params: { user: $route.params.user } }"
      >{{ $route.params.user }}</router-link>
    </h3>
    <div v-if="isLoading">
      <post-skeleton v-for="i in 10" :key="i" />
    </div>
    <div v-else>
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
      <pagination-view :page="page" :page-count="pageCount"></pagination-view>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PaginationView from '@/components/PaginationView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'

export default {
  metaInfo () {
    return {
      title: 'Записи пользователя'
    }
  },
  data () {
    return {
      ...this.mapData({
        posts: 'posts/my'
      }),
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  mounted () {
    this.refreshPage(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage (route) {
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$posts.groups.my.indexes = []

      this.$posts
        .getUserPosts(route.params.user, this.page)
        .then(pages => {
          this.pageCount = pages
          this.isLoading = false
        })
        .catch(err => {
          this.isLoading = false
          console.log(err)

          this.$router.push({ path: '/404' })
        })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'userPosts', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'userPosts', query: { page: page } })
    }
  },
  components: {
    PostView,
    PaginationView,
    PostSkeleton
  }
}
</script>

