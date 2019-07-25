<template>
  <the-sidebar>
    <div class="columns">

      <div class="column col-12 col-md-6" v-if="data.current">
        <sidebar-block>
          <h4>Еще записи пользователя<br><i>{{ data.current.creator.name || data.current.creator.username }}</i></h4>
          <ul class="relevant">
            <li v-for="item in lPosts" :key="item.id">
              <small class="label">{{ item.created_date | moment }}</small>
              <br>
              <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
            </li>
          </ul>
        </sidebar-block>
      </div>

      <div class="column col-12 col-md-6" v-if="data.current">
        <sidebar-block>
          <h4>Еще записи из блога<br><i>{{ data.current.blog.title }}</i></h4>
          <ul class="relevant">
            <li v-for="item in bPosts" :key="item.id">
              <small class="label">{{ item.created_date | moment }}</small>
              <br>
              <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
            </li>
          </ul>
        </sidebar-block>
      </div>

    </div>
  </the-sidebar>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'
import SidebarBlock from '@/components/elements/SidebarBlock.vue'

export default {
  data() {
    return {
      ...this.mapData({
        data: 'posts/data'
      }),
      lPosts: [],
      bPosts: []
    }
  },
  mounted() {
    if (!this.data.current)
      return
    
    this.$posts.getOtherUserPosts(this.data.current.creator.username, 5, 1).then(posts => {
      this.lPosts = posts
    })
    this.$posts.getBlogPosts(this.data.current.blog.url, { limit: 5, page: 1 }).then(posts => {
      this.bPosts = posts.data
    })
  },
  watch: {
    'data.current'() {
      this.$posts.getOtherUserPosts(this.data.current.creator.username, 5, 1).then(posts => {
        this.lPosts = posts
      })
      this.$posts.getBlogPosts(this.data.current.blog.url, { limit: 5, page: 1 }).then(posts => {
        this.bPosts = posts.data
      })
    }
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
