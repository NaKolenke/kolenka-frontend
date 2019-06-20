<template>
  <div>
    <h2>Поиск</h2>
    <form @submit.prevent="send" class="panel mb-2">
      <div class="panel-header">
        <input class="form-input" type="text" placeholder="Введите запрос" v-model="model.query" autofocus />
      </div>
      
      <div class="panel-body mb-2">
        <div class="columns mt-2">
          <div class="column col-lg-auto">
            <div class="form-group">
              <label class="form-radio form-inline">
                <input type="radio" name="type" value="full" v-model="model.type" checked>
                <i class="form-icon"></i> Везде
              </label>
              <label class="form-radio form-inline">
                <input type="radio" name="type" value="post" v-model="model.type">
                <i class="form-icon"></i> Посты
              </label>
              <label class="form-radio form-inline">
                <input type="radio" name="type" value="blog" v-model="model.type">
                <i class="form-icon"></i> Блоги
              </label>
              <label class="form-radio form-inline">
                <input type="radio" name="type" value="user" v-model="model.type">
                <i class="form-icon"></i> Пользователи
              </label>
            </div>
          </div>
          <input class="btn btn-primary column col-2 mx-2" type="submit" value="Найти" />
        </div>
      </div>
    </form>

    <div v-if="model.type === 'full' && queryAvailable" class="columns col-12 mt-2">
      <div class="column col-6">
        <h4>Пользователи</h4>
        
        <div v-if="users.length > 0">
          <ul style="list-style:none;margin-left:2px">
            <li v-for="item in users" :key="item.id">
              <avatar :user="item" size="sm"></avatar><router-link :to="{ name: 'profile', params: { user: item.username } }"> {{ item.name || item.username }}</router-link>
            </li>
          </ul>
          <router-link
            v-if="users.length > 5"
            :to="{ name: 'search', query: { type: 'user', q: model.query } }"
          >Найти еще пользователей</router-link>
        </div>

        <div v-else class="empty">
          <p class="empty-title h5">Пользователей не найдено</p>
        </div>
      </div>
      <div class="column col-6">
        <h4>Блоги</h4>

        <div v-if="blogs.length > 0">
          <blog-card-small v-for="item in blogs.slice(0, 2)" :key="item.id" :blog="item"></blog-card-small>
          <router-link
            v-if="blogs.length > 2" 
            :to="{ name: 'search', query: { type: 'blog', q: model.query } }"
          >Найти еще блоги</router-link>
        </div>

        <div v-else class="empty">
          <p class="empty-title h5">Блогов не найдено</p>
        </div>
      </div>
    </div>

    
    <div v-if=" queryAvailable && (model.type === 'post' || model.type === 'full')">
      <h4 v-if="queryAvailable">Посты</h4>
      <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>

      <div v-if="queryAvailable && posts.length === 0" class="empty">
        <p class="empty-title h5">Записей не найдено</p>
      </div>
    </div>

    <div v-if="queryAvailable && model.type === 'blog'">
      <h4 v-if="queryAvailable">Блоги</h4>
      <div class="columns">
        <div v-for="item in blogs" :key="item.id" class="column col-4 mb-2">
          <blog-card-small :blog="item" style="height: 100%"></blog-card-small>
        </div>
      </div>
    </div>

    <div v-if="queryAvailable && model.type === 'user'">
      <h4 v-if="queryAvailable">Пользователи</h4>
      <div class="columns">
        <div v-for="item in users" :key="item.id" class="column col-3">
          <avatar :user="item" size="sm"></avatar><router-link :to="{ name: 'profile', params: { user: item.username } }"> {{ item.name || item.username }}</router-link>
        </div>
      </div>
    </div>

    <pagination-view v-if="queryAvailable" :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PaginationView from '@/components/PaginationView.vue'
import BlogCardSmall from '@/components/cards/BlogCardSmall.vue'
import Avatar from '@/components/elements/Avatar.vue'

export default {
  metaInfo() {
    return {
      title: 'Поиск'
    }
  },
  data() {
    return {
      users: [],
      blogs: [],
      posts: [],
      page: 1,
      pageCount: 1,
      model: {
        query: '',
        type: 'full' // full, post, blog, user
      },
      queryAvailable: false
    }
  },
  mounted() {
    if (this.$route.query)
      this.refresh(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refresh(to)
  },
  methods: {
    send() {
      this.$router.push({ name: 'search', query: { type: this.model.type, q: this.model.query, page: 1 } })
    },
    refresh(route) {
      const type = route.query.type

      this.model.type = type || 'full'
      this.model.query = route.query.q || ''
      this.page = route.query.page || 1

      if (this.model.query.length === 0)
        return
    
      if (type === 'full') {
        this.fullRefresh()
        this.queryAvailable = true
      } else if (type === 'post') {
        this.refreshPosts()
        this.queryAvailable = true
      } else if (type === 'blog') {
        this.refreshBlogs()
        this.queryAvailable = true
      } else if (type === 'user') {
        this.refreshUsers()
        this.queryAvailable = true
      } else {
        this.$router.replace('/search')
      }      
    },
    fullRefresh() {
      this.refreshUsers()
      this.refreshBlogs()
      this.refreshPosts()
    },
    refreshUsers() {
      this.$search.findUsers(this.model.query, { page: this.page }).then(res => {
        if (this.model.type !== 'full') {
          this.pageCount = res.meta.page_count
        }
        this.users = res.result
      }).catch(err => {
        console.log(err)
      })
    },
    refreshBlogs() {
      this.$search.findBlogs(this.model.query, { page: this.page }).then(res => {
        if (this.model.type !== 'full') {
          this.pageCount = res.meta.page_count
        }
        this.blogs = res.result
      }).catch(err => {
        console.log(err)
      })
    },
    refreshPosts() {
      this.$search.findPosts(this.model.query, { page: this.page }).then(res => {
        this.posts = res.result
        this.pageCount = res.meta.page_count
      }).catch(err => {
        console.log(err)
      })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'search', query: { page: this.page + offset, type: this.model.type, q: this.model.query } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'search', query: { page: page, type: this.model.type, q: this.model.query } })
    }
  },
  components: {
    PostView,
    PaginationView,
    BlogCardSmall,
    Avatar
  }
}
</script>
