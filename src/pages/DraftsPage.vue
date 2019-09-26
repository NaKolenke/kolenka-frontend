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
import { mapState } from 'vuex'
import PostView from '@/components/PostView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import PaginationView from '@/components/PaginationView.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Черновики'
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
  created () {
    if (!this.user) {
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
      this.posts = []
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$store.dispatch('posts/getUserDrafts', { pagination: new Pagination(this.page) })
        .then(res => {
          this.posts = res.posts
          this.pageCount = res.meta.page_count
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'userDrafts', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'userDrafts', query: { page: page } })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
  },
  components: {
    PostView,
    PaginationView,
    PostSkeleton
  }
}
</script>

