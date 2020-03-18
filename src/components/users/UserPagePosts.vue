<template>
  <div>
    <div v-if="isLoading">
      <post-skeleton v-for="i in 10" :key="i" />
    </div>
    <div v-else>
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
    </div>

    <div v-if="posts != null && posts.length == 0">Этот пользователь еще не написал ни одного поста</div>

    <pagination-view :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>


<script>
import PostView from '@/components/PostView.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import PaginationView from '@/components/PaginationView.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'


export default {
  props: {
    user: Object,
  },
  data: function () {
    return {
      posts: null,
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  mounted: function () {
    this.refreshPosts()
    this.page = 1
  },
  beforeDestroy: function () {
    this.posts = null
    this.page = 1
  },
  methods: {
    refreshPosts: function () {
      this.posts = null
      this.isLoading = true

      this.$store.dispatch('posts/getUserPosts', { username: this.user.username, pagination: new Pagination(this.page) })
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
      this.page = this.page + offset
      this.refreshPosts()
    },
    paginateTo (page) {
      this.page = page
      this.refreshPosts()
    }
  },
  components: {
    PostView,
    PostSkeleton,
    PaginationView
  }
}
</script>
