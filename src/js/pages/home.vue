<template>
  <div>
    <SubmenuView></SubmenuView>

    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <ArticleView v-for="post in posts" :key="post.id" :post="post" :cut="true"></ArticleView>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <SidebarBlock :version="version"></SidebarBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleView from "./../components/article.vue";
import SidebarBlock from "./../components/sidebar-block.vue";
import SubmenuView from "./../components/submenu.vue";
import config from "./../config.json";

export default {
  data: function() {
    this.posts = [];

    return {
      posts: this.posts,
      version: config.version
    };
  },
  created: function() {
	var page = this.$route.query.page || 1;
    fetch(config.apiUrl + "/posts/?page=" + page)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.posts = data.posts;
      });
  },
  components: {
    ArticleView,
    SidebarBlock,
    SubmenuView
  }
};
</script>

