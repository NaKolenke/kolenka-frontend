<template>
  <div>
    <h2>Поиск</h2>
    <form @submit.prevent="send">
      <input class="form-input" type="text" placeholder="Введите запрос" v-model="model.query" />
      <div class="columns mt-2">
        <div class="column col-lg-auto">
          <div class="form-group">
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
    </form>

    <div v-if="model.type === 'full' && queryAvailable" class="columns col-12 mt-2">
      <div class="column col-6">
        <h4>Пользователи</h4>
        <ul style="list-style:none;margin-left:0">
          <li v-for="item in users" :key="item.id">
            <avatar :user="item" size="sm"></avatar><router-link :to="{ name: 'profile', params: { user: item.username } }"> {{ item.name || item.username }}</router-link>
          </li>
        </ul>
        <a v-if="users.length > 5" href="#">Найти еще пользователей</a>
      </div>
      <div class="column col-6">
        <h4>Блоги</h4>
        <blog-card-small v-for="item in blogs.slice(0, 2)" :key="item.id" :blog="item"></blog-card-small>
        <a v-if="blogs.length > 2" href="#">Найти еще блоги</a>
      </div>
    </div>

    <h4 v-if="queryAvailable">Посты</h4>
    <post-view v-for="post in posts" :key="post.id" :post="post" :cut="true"></post-view>
    <pagination-view v-if="queryAvailable" :page="page" :page-count="pageCount"></pagination-view>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
import PaginationView from '@/components/PaginationView.vue'
import BlogCardSmall from '@/components/cards/BlogCardSmall.vue'
import Avatar from '@/components/elements/Avatar.vue'

export default {
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

  },
  methods: {
    send() {
      if (this.model.type === 'full') {
        //this.refreshUsers()
        //this.refreshBlogs()
        //this.refreshPosts()
        //this.queryAvailable = true
      }

      this.$router.push({ name: 'search', query: { type: this.model.type, q: this.model.query } })
    },
    refreshUsers() {
      this.$search.findUsers(this.model.query, { page: this.page }).then(res => {
        this.users = res.result
      }).catch(err => {
        console.log(err)
      })
    },
    refreshBlogs() {
      this.$search.findBlogs(this.model.query, { page: this.page }).then(res => {
        this.blogs = res.result
      }).catch(err => {
        console.log(err)
      })
    },
    refreshPosts() {
      this.$search.findPosts(this.model.query, { page: this.page }).then(res => {
        this.posts = res.result
      }).catch(err => {
        console.log(err)
      })
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
