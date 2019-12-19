<template>
  <div>
    <template v-if="isLoading">
      <blog-skeleton v-for="i in 10" :key="i" />
    </template>

    <div v-else id="content">
      <blog-card v-for="blog in blogs" :key="blog.id" :blog="blog"></blog-card>
      <pagination-view :page="page" :page-count="pageCount"></pagination-view>
    </div>
  </div>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import BlogCard from '@/components/cards/BlogCard.vue'
import BlogSkeleton from '@/components/skeletons/BlogCard.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Блоги'
    }
  },
  data () {
    return {
      blogs: [],
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
      this.blogs = []
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$store.dispatch('blogs/getAllBlogs', { pagination: new Pagination(this.page) })
        .then(res => {
          this.blogs = res.blogs
          this.pageCount = res.meta.page_count
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'blogs', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'blogs', query: { page: page } })
    }
  },
  components: {
    PaginationView,
    BlogCard,
    BlogSkeleton
  }
}
</script>
