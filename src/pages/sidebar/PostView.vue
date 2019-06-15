<template>
  <the-sidebar>
    <div class="columns">
      <div v-if="data.current" class="column">
        <sidebar-block>
          
        </sidebar-block>
      </div>
      <div class="column">
        <sidebar-block>
          <h4>Еще записи пользователя<br><i v-if="user">{{ user.name || user.username }}</i></h4>
          <!--<ul class="relevant">
            <li v-for="item in latestUserPosts.slice(0, 4).filter(x => !x.is_draft)" :key="item.id">
              <small class="label">{{ item.created_date | moment }}</small>
              <br>
              <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
            </li>
          </ul>-->
        </sidebar-block>
      </div>

      <div class="column">
        <sidebar-block>
          <h4>Еще записи из блога<br><i v-if="blog">{{ blog.title }}</i></h4>
          <!--<ul class="relevant">
            <li v-for="item in latestBlogPosts.slice(0, 4)" :key="item.id">
              <small class="label">{{ item.created_date | moment }}</small>
              <br>
              <router-link :to="{ name: 'post', params: { post: item.url } }">{{ item.title }}</router-link>
            </li>
          </ul>-->
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
      user: null,
      blog: null
    }
  },
  created() {
    this.user = this.$route.params.user
    this.blog = this.$route.params.blog

    // ... TODO
  },
  computed: {
    outline() {
      // TODO: regex parsing post text
    }
  },
  components: {
    TheSidebar,
    SidebarBlock
  }
}
</script>

