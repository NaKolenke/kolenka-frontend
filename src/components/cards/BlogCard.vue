<template>
  <div class="container columns">
    <div class="column col-1">
      <avatar-view :user="blog.creator" :size="'lg'"></avatar-view>
    </div>

    <div class="column col-11">
      <h3>
        <div v-if="blog.url" class="columns">
          <div class="column col-10">
            <router-link  :to="{ name: 'blog', params: { name: blog.url } }">{{ blog.title }}</router-link>
          </div>
          <div class="column col-2">
            <button v-if="blog.blog_type === 1 && !contains" class="btn btn-sm" @click="joinBlog">Присоединиться</button>
            <button v-if="contains" class="btn btn-sm" disabled>Вы присоединились</button>
            <router-link
              v-if="$meta.data.user && blog.creator.id === $meta.data.user.id"
              :to="{ name: 'edit-blog', params: { edit: blog } }"
              class="btn btn-sm"
            >Редактировать</router-link>
          </div>
        </div>
        <span v-else>{{ blog.title }}</span>
      </h3>

      <p v-html="blog.description"></p>

      <div v-if="preview && posts.length > 0" class="columns">
        <div class="column col-6" v-for="item in posts" :key="item.id">
          <div class="card my-1">
            <div class="card-header">
              <div class="card-title h5">
                <router-link  :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
              </div>
              <div class="card-subtitle text-gray"><small>{{ item.created_date | moment }} / {{ item.creator.name || item.creator.username }}</small></div>
            </div>
            <div class="card-body">
              <p v-html="item.cut_text.substring(0, 256)"></p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="preview && posts.length == 0" class="empty">
        <p class="empty-title h5">В этом блоге еще нет записей</p>
      </div>

    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'
import BlogService from '@/services/blog'

export default {
  props: {
    blog: Object,
    preview: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ...this.mapData({
        blogs: 'userBlogs/everything'
      }),
      posts: []
    }
  },
  components: {
    AvatarView
  },
  mounted () {    
    if (this.preview)
      this.refresh()
  },
  methods: {
    refresh () {
      if (!this.blog.url)
        return
      
      BlogService.getBlogPosts(this.blog.url).then(data => {
        this.posts = data.posts.length > 2 ? data.posts.slice(0, 2) : data.posts
      }).catch(err => {
        console.log(err)
      })
    },
    joinBlog () {
      BlogService.joinBlog(this.blog.url).then(data => {
        this.$toast.show(`Успешно присоединились к блогу "${this.blog.title}"`)
        this.$userBlogs.collect(this.blog, 'everything')
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    contains () {
      for (let item of this.blogs) {
        if (item.id === this.blog.id) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style>
.card-body p img {
  width: 100%;
  height: auto;
}
</style>
