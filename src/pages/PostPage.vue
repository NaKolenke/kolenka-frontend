<template>
  <div>
    <template v-if="loading.post">
      <post-skeleton />
    </template>
    <post-view v-else :post="post" :cut="false"></post-view>

    <div id="comments_container" v-if="!post.is_draft">
      <h3 id="comments">Комментарии <small class="text-gray">{{ commentsCount }}</small></h3>
      <comment-form v-if="auth.user" :post-url="post.url" @sent="addComment"></comment-form>
      <div v-if="auth.user" class="mt-2"></div>
      <template v-if="loading.comments">
        <comment-skeleton />
      </template>
      <comment-card v-else v-for="item in comments" :key="item.id" :comment="item" :post-url="post.url"></comment-card>
      <div class="bottom-padd"></div>
    </div>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import CommentCard from '@/components/cards/CommentCard.vue'
import CommentForm from '@/components/CommentForm.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import CommentSkeleton from '@/components/skeletons/Comment.vue'

export default {
  data: function () {
    return {
      ...this.mapData({
        comments: 'comments/root',
        auth: 'auth/data'
      }),
      post: {},
      commentsCount: 0,
      loading: {
        comments: true,
        post: true
      }
    }
  },
  mounted () {
    this.refreshPost(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPost(to)
    next()
  },
  methods: {
    refreshPost (route) {
      this.$posts
      .getPostByUrl(route.params.post)
      .then(post => {        
        this.post = post
        this.loading.post = false
      })
      .then(() => this.refreshComments(route))
      .catch(err => {
        this.$router.push({ path: '/404' })
      })
    },
    refreshComments(route) {
      this.$comments.purge()

      this.$comments.getComments(route.params.post).then(count => {
        this.commentsCount = count
        this.loading.comments = false
      }).catch(err => {
        console.log(err)
      })
    },
    addComment(id) {
      this.commentsCount++
      this.$nextTick(() => {
        this.$scrollTo('#comment_' + id, 1000, { cancelable: true })
      })
    }
  },
  components: {
    PostView,
    CommentCard,
    CommentForm,
    PostSkeleton,
    CommentSkeleton
  }
}
</script>

<style scoped>
.relevant {
  list-style: none;
  margin: 0;
}

.relevant li {
  margin-top: 0;
  margin-bottom: .4rem;
}
</style>

<style>
#comments_container > .comment {
  border: none;
}
#comments_container > .comment > .card-body {
  padding-left: 0;
}
</style>

