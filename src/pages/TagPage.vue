<template>
  <div>
    <div v-if="isLoading" class="column col-9">
      <loading-view></loading-view>
    </div>
    <div v-else id="content" class="column col-9">
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
      <pagination-view :page="page" :page-count="pageCount"></pagination-view>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import LoadingView from '@/components/LoadingView.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  metaInfo() {
    return {
      title: 'Тег'
    }
  },
  data () {
    return {
      ...this.mapData({
        posts: 'posts/tag'
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

      this.$posts
      .getPostsByTag(route.params.title, this.page).then(posts => {
        this.pageCount = posts.meta.page_count
        this.isLoading = false
      })
      .catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'tag', params:{ title: this.$route.params.title }, query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'tag', params:{ title: this.$route.params.title }, query: { page: page } })
    }
  },
  components: {
    PostView,
    PaginationView,
    LoadingView
  }
}
</script>
