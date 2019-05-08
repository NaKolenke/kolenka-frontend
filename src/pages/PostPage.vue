<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <post-view v-if="post.blog" :post="post" :cut="false"></post-view>
          <h3>Комментарии <small class="text-gray">{{ commentsCount }}</small></h3>
          <comment-form v-if="$meta.actions.isLoggedIn()" :post-url="post.url"></comment-form>
          <comment-card v-for="item in comments" :key="item.id" :comment="item"></comment-card>
          <div class="mt-2"></div>
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
import CommentForm from '@/components/CommentForm'

export default {
  data: function () {
    return {
      post: {},
      comments: [],
      commentsCount: 0
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
        this.commentsCount = data.comments.length
        
        data.comments.forEach(item => {
          if (item.parent) {
            let parent = data.comments.find(x => x.id === item.parent.id)
            if (!parent.children)
              parent.children = []
            
            parent.children.push(item)
          }
        })

        this.comments = data.comments.filter(x => x.parent == null).reverse()
      }).catch(err => {
        console.log(err)

        this.$router.push({ path: '/404' })
      })
    }
  },
  components: {
    PostView,
    TheSidebar,
    CommentCard,
    CommentForm
  }
}
</script>

<style>
#content > .comment {
  border: none;
}
</style>

