<template>
  <div v-if="isLoading">
    <post-skeleton v-for="i in 10" :key="i" />
  </div>
  <div v-else>
    <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
    <pagination-view :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PaginationView from '@/components/PaginationView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'

export default {
  data () {
    return {
      ...this.mapData({
        posts: 'posts/home'
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
    this.$posts.purge()
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage (route) {
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$posts.getHomePage(this.page).then(pages => {
        this.pageCount = pages
        this.isLoading = false
      })
    },
    paginateRelative (offset) {
      this.$posts.purge()
      this.$router.push({ name: 'home', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$posts.purge()
      this.$router.push({ name: 'home', query: { page: page } })
    }
  },
  components: {
    PostView,
    PaginationView,
    PostSkeleton
  }
}
</script>
