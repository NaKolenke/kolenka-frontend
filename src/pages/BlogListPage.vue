<template>
  <div>
    <template v-if="isLoading">
      <blog-skeleton v-for="i in 10" :key="i" />
    </template>

    <div v-else id="content" >
      <blog-card v-for="blog in blogs" :key="blog.id" :blog="blog"></blog-card>
      <pagination-view :page="page" :page-count="pageCount"></pagination-view>
    </div>
  </div>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import BlogCard from '@/components/cards/BlogCard.vue'
import BlogSkeleton from '@/components/skeletons/BlogCard.vue'

export default {
  metaInfo() {
    return {
      title: 'Блоги'
    }
  },
  data () {
    return {
      ...this.mapData({
        blogs: 'blogs/everything'
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
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$blogs.indexes.everything = []

      this.$blogs.getAll({ page: this.page }).then(pages => {
        this.pageCount = pages
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
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
