<template>
  <div class="container columns">
    <div class="column col-1 col-md-2">
      <avatar :user="blog.creator" :size="'lg'" />
    </div>

    <div class="column col-11 col-md-10">
      <h3>
        <div v-if="blog.url" class="columns">
          <div class="column col-10">
            <router-link  :to="{ name: 'blog', params: { name: blog.url } }">{{ blog.title }}</router-link>
          </div>
          <div class="column col-auto">
            <button v-if="auth.user && blog.blog_type === 1 && !contains" class="btn btn-sm" @click="joinBlog">Присоединиться</button>
            <button v-if="auth.user && contains" class="btn btn-sm" disabled>Вы присоединились</button>
            <router-link
              v-if="auth.user && blog.creator.id === auth.user.id"
              :to="{ name: 'edit-blog', params: { edit: blog } }"
              class="btn btn-sm"
            >Редактировать</router-link>
          </div>
        </div>
        <span v-else>{{ blog.title }}</span>
      </h3>

      <p v-html="blog.description"></p>

      <div v-if="preview && posts.length > 0" class="columns">
        <div class="column col-6 col-md-12" v-for="item in posts" :key="item.id">
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
import Avatar from '@/components/elements/Avatar.vue'

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
        blogs: 'blogs/my',
        auth: 'auth/data'
      }),
      posts: []
    }
  },
  mounted() {
    if (this.preview)
      this.refresh()
  },
  methods: {
    refresh() {
      if (!this.blog.url)
        return
      
      this.$posts.getBlogPosts(this.blog.url, { limit: 2 }).then(posts => {
        this.posts = posts.data
      }).catch(err => {
        this.$log.error(err)
      })
    },
    joinBlog() {
      this.$blogs.joinBlog(this.blog.url).then(() => {
        this.$toast.show(`Успешно присоединились к блогу "${this.blog.title}"`)
        this.$blogs.collect(this.blog, 'my')
      }).catch(err => {
        this.$log.error(err)
        this.$toast.error('Произошла ошибка')
      })
    }
  },
  computed: {
    contains() {      
      return !!this.blogs.find(x => x.id === this.blog.id)
    }
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.card-body p img {
  height: auto;
}
</style>
