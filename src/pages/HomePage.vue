<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div v-if="isLoading" class="column col-9">
          <loading-view></loading-view>
        </div>
        <div v-else id="content" class="column col-9">
          <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
          <pagination-view :page="page" :page-count="pageCount"></pagination-view>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import LoadingView from '@/components/LoadingView.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import PaginationView from '@/components/PaginationView.vue'
import PostService from '@/services/post'

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
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage (route) {
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      PostService.getPosts(this.page).then(data => {
        this.posts = data.posts
        this.$posts.collect(data.posts, 'everything')
        this.pageCount = data.meta.page_count
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'home', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'home', query: { page: page } })
    }
  },
  components: {
    PostView,
    TheSidebar,
    PaginationView,
    LoadingView
  }
}
</script>
