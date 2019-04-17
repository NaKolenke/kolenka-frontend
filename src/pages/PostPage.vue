<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <post-view v-if="post.blog" :post="post" :cut="false"></post-view>
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
    this.post = {}

    return {
      post: this.post
    }
  },
  created: function () {
    this.refreshPost(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPost(to)
    next()
  },
  methods: {
    refreshPost: function (route) {
      PostService.getPost(route.params.post).then(data => {
        this.post = data.post
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
