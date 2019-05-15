<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <post-view v-if="post.blog" :post="post" :cut="false"></post-view>

          <div v-if="$meta.actions.isLoggedIn()" style="margin-top: 22px"></div>
          <h3 id="#comments">Комментарии <small class="text-gray">{{ commentsCount }}</small></h3>
          <comment-form v-if="$meta.actions.isLoggedIn()" :post-url="post.url" :action="addComment"></comment-form>
          <div v-if="$meta.actions.isLoggedIn()" class="mt-2"></div>
          <comment-card v-for="item in comments" :key="item.id" :comment="item" :post-url="post.url"></comment-card>
          <div class="mt-2"></div>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <the-sidebar>
            <div class="side-block bg-secondary">
              <h4>Еще записи пользователя<br><i v-if="post.creator" style="word-break:break-all">{{ post.creator.name || post.creator.username }}</i></h4>
              <ul class="relevant">
                <li v-for="item in latestUserPosts.slice(0, 4).filter(x => !x.is_draft)" :key="item.id">
                  <small class="label">{{ item.created_date | moment }}</small>
                  <br>
                  <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
                </li>
              </ul>
            </div>
            <div class="side-block bg-secondary">
              <h4>Еще записи из блога<br><i style="word-break:break-all" v-if="post.blog">{{ post.blog.title }}</i></h4>
              <ul class="relevant">
                <li v-for="item in latestBlogPosts.slice(0, 4)" :key="item.id">
                  <small class="label">{{ item.created_date | moment }}</small>
                  <br>
                  <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
                </li>
              </ul>
            </div>
          </the-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import PostView from '@/components/PostView.vue'
import TheSidebar from '@/components/TheSidebar.vue'
import PostService from '@/services/post'
import CommentCard from '@/components/cards/Comment.vue'
import CommentForm from '@/components/CommentForm'
import BlogService from '@/services/blog'
import UserService from '@/services/user'

export default {
  data: function () {
    return {
      ...this.mapData({
        comments: 'comments/everything'
      }),
      post: {},
      commentsCount: 0,
      latestBlogPosts: [],
      latestUserPosts: []
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
      this.$comments.purge()

      PostService
      .getPost(route.params.post)
      .then(data => {
        this.post = data.post
      })
      .then(() => PostService.getComments(route.params.post))
      .then(data => {
        this.commentsCount = data.comments.length
        
        data.comments.forEach(item => {
          if (item.parent) {
            let parent = data.comments.find(x => x.id === item.parent.id)
            if (!parent.children)
              parent.children = []
            
            parent.children.push(item)
          }
        })

        this.$comments.collect(data.comments.filter(x => x.parent == null).reverse(), 'everything')
      })
      .then(() => BlogService.getBlogPosts(this.post.blog.url))
      .then(data => {
        this.latestBlogPosts = data.posts
      })
      .then(() => UserService.getUserPosts(this.post.creator.username))
      .then(data => {
        this.latestUserPosts = data.posts
      })
      .catch(err => {
        console.log(err)

        this.$router.push({ path: '/404' })
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
    TheSidebar,
    CommentCard,
    CommentForm
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
#content > .comment {
  border: none;
}
</style>

