<template>
  <div>
    <h3>Черновики</h3>
    <div v-if="isLoading">
      <post-skeleton v-for="i in 5" :key="i" />
    </div>
    <div v-else>
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
      <pagination-view :page="page" :page-count="pageCount"></pagination-view>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import PaginationView from '@/components/PaginationView.vue'

export default {
  metaInfo() {
    return {
      title: 'Черновики'
    }
  },
  data () {
    return {
      ...this.mapData({
        posts: 'posts/drafts',
        auth: 'auth/data'
      }),
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  created() {
    if (!this.auth.user) {
      this.$router.replace({ path: '/' })
      return
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

      this.$posts.groups.drafts.indexes = []

      this.$posts.getUserDrafts(this.page).then(pages => {
        this.pageCount = pages
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'userDrafts', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'userDrafts', query: { page: page } })
    }
  },
  components: {
    PostView,
    PaginationView,
    PostSkeleton
  }
}
</script>

