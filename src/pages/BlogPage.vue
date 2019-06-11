<template>
  <div>
    <div class="card">
      <div class="card-body">
        <blog-card v-if="blog" :blog="blog" :preview="false"></blog-card>
      </div>
      <div v-if="readers.length > 0" class="card-footer">
        <div class="card-subtitle">
          <span class="text-gray mx-1">Подписчики </span>
          <avatar
            v-for="reader in readers"
            :key="reader.id"
            :user="reader"
            :card="false"
            class="mx-1 tooltip"
            :data-tooltip="reader.name || reader.username"
          />
        </div>
      </div>
    </div>
    
    <div v-if="isLoading">
      <post-skeleton v-for="i in 10" :key="i" />
    </div>
    <div v-else>
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
    </div>
    
    <pagination-view :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PaginationView from '@/components/PaginationView.vue'
import BlogCard from '@/components/cards/BlogCard.vue'
import Avatar from '@/components/elements/Avatar.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'

export default {
  data() {
    return {
      blog: null,
      posts: [],
      readers: [],
      page: 1,
      isLoading: true,
      pageCount: 0
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

      this.$blogs
      .getBlog(route.params.name)
      .then(blog => {
        this.blog = blog
      })
      .then(() => this.$posts.getBlogPosts(route.params.name, { page: this.page }))
      .then(posts => {
        this.posts = posts.data
        this.pageCount = posts.pages
        this.isLoading = false
      })
      .then(() => this.$blogs.getReaders(route.params.name))
      .then(readers => {
        this.readers = readers
      })
      .catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'blog', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'blog', query: { page: page } })
    }
  },
  components: {
    PostView,
    PaginationView,
    BlogCard,
    Avatar,
    PostSkeleton
  }
}
</script>
