<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div v-if="isLoading" class="column col-9">
        <loading-view></loading-view>
      </div>
      <div v-else id="content" class="column col-9">
        <div class="card">
          <div class="card-body">
            <blog-card v-if="blog" :blog="blog" :preview="false"></blog-card>
          </div>
          <div v-if="readers.length > 0" class="card-footer">
            <div class="card-subtitle">
              <span class="text-gray mx-1">Подписчики </span>
              <avatar-view
                v-for="reader in readers"
                :key="reader.id"
                :user="reader"
                :card="false"
                class="mx-1 tooltip"
                :data-tooltip="reader.name || reader.username"
              ></avatar-view>
            </div>
          </div>
        </div>
        <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
        <pagination-view :page="page" :page-count="pageCount"></pagination-view>
      </div>

      <div id="sidebar" class="column col-3 hide-md">
        <the-sidebar></the-sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import LoadingView from '@/components/LoadingView.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import PaginationView from '@/components/PaginationView.vue'
import BlogCard from '@/components/cards/BlogCard.vue'
import AvatarView from '@/components/AvatarView.vue'
import BlogService from '@/services/blog'

export default {
  data() {
    return {
      blog: null,
      posts: [],
      readers: [],
      page: 1,
      isLoading: true
    }
  },
  created: function () {
    this.refreshPage(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage: function (route) {
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      BlogService
      .getBlog(route.params.name)
      .then(data => {
        this.blog = data.blog
        
        return BlogService
      })
      .then(service => service.getBlogPosts(route.params.name, this.page))
      .then(data => {
        this.posts = data.posts
        this.pageCount = data.meta.page_count
        this.isLoading = false

        return BlogService
      })
      .then(service => service.getReaders(route.params.name))
      .then(data => {
        this.readers = data.readers
      })
      .catch(err => {
        this.isLoading = false
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    },
    paginateRelative: function (offset) {
      this.$router.push({ name: 'blog', query: { page: this.page + offset } })
    },
    paginateTo: function (page) {
      this.$router.push({ name: 'blog', query: { page: page } })
    }
  },
  components: {
    PostView,
    LoadingView,
    TheSidebar,
    PaginationView,
    BlogCard,
    AvatarView
  }
}
</script>
