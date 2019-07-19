<template>
  <div>
    <transition name="fade">
      <div v-if="isLoading">
        <post-skeleton v-for="i in 10" :key="i" />
      </div>
    </transition>
    <div v-if="!isLoading">
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
      <pagination-view :page="page" :page-count="pageCount"></pagination-view>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PaginationView from '@/components/PaginationView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import df from '@/mixins/dataFetch'

export default {
  metaInfo() {
    return {
      title: 'Главная'
    }
  },
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
  created () {
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
  },
  mixins: [ df ]
}
</script>

<style lang="scss" scoped>
@import './../assets/transitions';
</style>