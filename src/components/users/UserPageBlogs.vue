<template>
  <div :class="{'loading loading-lg': isLoading }">
    <div v-for="item in blogs" :key="item.id">
      <blog-card :blog="item" :preview="false"></blog-card>
    </div>
    <div v-if="blogs != null && blogs.length == 0">Этот пользователь еще не состоит в блогах</div>

    <pagination-view :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>


<script>
import PaginationView from '@/components/PaginationView.vue'
import BlogCard from '@/components/cards/BlogCard.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'


export default {
  props: {
    user: Object,
  },
  data: function () {
    return {
      blogs: null,
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  mounted: function () {
    this.refreshBlogs()
    this.page = 1
  },
  beforeDestroy: function () {
    this.blogs = null
    this.page = 1
  },
  methods: {
    refreshBlogs: function () {
      this.blogs = []
      this.isLoading = true

      this.$store.dispatch('blogs/getUserBlogs', { username: this.user.username, pagination: new Pagination(this.page) })
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
      this.page = this.page + offset
      this.refreshBlogs()
    },
    paginateTo (page) {
      this.page = page
      this.refreshBlogs()
    }
  },
  components: {
    BlogCard,
    PaginationView
  }
}
</script>
