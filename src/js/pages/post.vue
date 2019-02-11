<template>
  <div>
    <SubmenuView></SubmenuView>

    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <ArticleView v-if="post.blog" :post="post" :cut="false"></ArticleView>
        </div>

        <div id="sidebar" class="column col-3 hide-md">
          <SidebarBlock></SidebarBlock>
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
    this.post = {};

    return {
      post: this.post
    };
  },
  created: function() {
    fetch(config.apiUrl + "/posts/" + this.$route.params.post + "/")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.post = data.post;
      });
  },
  components: {
    ArticleView,
    SidebarBlock,
    SubmenuView
  }
};
</script>

