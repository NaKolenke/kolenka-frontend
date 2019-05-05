<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <post-view v-if="post.blog" :post="post" :cut="false"></post-view>
          <comment-card v-for="item in comments" :key="item.id" :comment="item"></comment-card>
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
import CommentCard from '@/components/cards/Comment.vue'

export default {
  data: function () {
    return {
      post: {},
      comments: []
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
      }).then(() => PostService.getComments(route.params.post)).then(data => {
        this.comments = data.comments
      }).catch(err => {
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    }
  },
  components: {
    PostView,
    TheSidebar,
    CommentCard
  }
}
</script>
