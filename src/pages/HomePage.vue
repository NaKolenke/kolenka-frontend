<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <the-sidebar></the-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import PostService from '@/services/post'

export default {
  data: function () {
    this.posts = []

    return {
      posts: this.posts
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
      var page = this.$route.query.page || 1
      PostService.getPosts(page).then(data => {
        this.posts = data.posts
      }).catch(err => {
        console.log(err)

        this.$router.replace({ path: '/404' })
      })
    }
  },
  components: {
    PostView,
    TheSidebar
  }
}
</script>
