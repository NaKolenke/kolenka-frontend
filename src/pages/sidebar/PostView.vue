<template>
  <the-sidebar>
    <div class="columns">
      <div class="column col-12 col-md-6" v-if="current">
        <sidebar-block>
          <h4>
            Еще записи пользователя
            <br />
            <i>{{ current.creator.name || current.creator.username }}</i>
          </h4>
          <ul class="relevant">
            <li v-for="item in lPosts" :key="item.id">
              <small class="label">{{ item.created_date | moment }}</small>
              <br />
              <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
            </li>
          </ul>
        </sidebar-block>
      </div>

      <div class="column col-12 col-md-6" v-if="current">
        <sidebar-block>
          <h4>
            Еще записи из блога
            <br />
            <i>{{ current.blog.title }}</i>
          </h4>
          <ul class="relevant">
            <li v-for="item in bPosts" :key="item.id">
              <small class="label">{{ item.created_date | moment }}</small>
              <br />
              <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
            </li>
          </ul>
        </sidebar-block>
      </div>
    </div>
  </the-sidebar>
</template>

<script>
import { mapState } from 'vuex'
import TheSidebar from '@/components/TheSidebar.vue'
import SidebarBlock from '@/components/elements/SidebarBlock.vue'
import Pagination from '@/models/pagination'

export default {
  data () {
    return {
      lPosts: [],
      bPosts: []
    }
  },
  mounted () {
    this.refresh()
  },
  watch: {
    'current' () {
      this.refresh()
    }
  },
  methods: {
    refresh () {
      if (!this.current) {
        return
      }

      this.$store.dispatch('posts/getUserPosts', { username: this.current.creator.username, pagination: new Pagination(1, 5) })
        .then(res => {
          this.lPosts = res.posts
        })
      this.$store.dispatch('posts/getBlogPosts', { url: this.current.blog.url, pagination: new Pagination(1, 5) })
        .then(res => {
          this.bPosts = res.posts
        })
    }
  },
  computed: {
    ...mapState({
      current: state => state.posts.current
    }),
  },
  components: {
    TheSidebar,
    SidebarBlock
  }
}
</script>

<style scoped>
.relevant {
  list-style: none;
  margin-left: 0;
  margin-bottom: 0;
}
</style>
