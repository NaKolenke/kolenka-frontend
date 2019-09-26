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
import { mapState } from 'vuex'
import PostView from '@/components/PostView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import PaginationView from '@/components/PaginationView.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Записи пользователя'
    }
  },
  data () {
    return {
      posts: [],
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
      this.posts = []
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$store.dispatch('posts/getUserPosts', { username: route.params.user, pagination: new Pagination(this.page) })
        .then(res => {
          this.posts = res.posts
          this.pageCount = res.meta.page_count
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          errors.handle(error)
          this.$toast.error(errors.getText(error))
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

