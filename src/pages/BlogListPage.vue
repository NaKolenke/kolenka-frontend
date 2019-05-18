<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div v-if="isLoading" class="column col-9">
          <loading-view></loading-view>
        </div>
        <div v-else id="content" class="columns column col-8 mx-2 px-2">
          <blog-card v-for="blog in blogs" :key="blog.id" :blog="blog"></blog-card>
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
import LoadingView from '@/components/LoadingView'
import TheSidebar from '@/components/TheSidebar'
import PaginationView from '@/components/PaginationView'
import BlogCard from '@/components/cards/BlogCard'
import BlogService from '@/services/blog'

export default {
  data: function () {
    this.blogs = []

    return {
      users: this.blogs,
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
      BlogService.getBlogs(this.page).then(data => {
        this.blogs = data.blogs
        this.pageCount = data.meta.page_count
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative: function (offset) {
      this.$router.push({ name: 'blogs', query: { page: this.page + offset } })
    },
    paginateTo: function (page) {
      this.$router.push({ name: 'blogs', query: { page: page } })
    }
  },
  components: {
    TheSidebar,
    PaginationView,
    LoadingView,
    BlogCard
  }
}
</script>

<style scoped>

</style>
