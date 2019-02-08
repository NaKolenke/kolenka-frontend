<template>
  <div class="article">
    <span class="subtitle">
      <a :href="'/blogs/' + post.blog.url + '/'">{{post.blog.title}}</a>
      , {{post.created_date | moment}}
    </span>
    <h2>
      <a :href="'/posts/' + post.url + '/'">{{post.title}}</a>
    </h2>

    <div v-if="cut" v-html="post.cut_text"></div>
    <div v-else v-html="post.text"></div>

    <a
      v-if="cut && post.has_cut"
      :href="'/posts/' + post.url + '/'"
      class="btn btn-sm"
    >{{ post.cut_name || 'Читать дальше' }}</a>

    <div class="columns article-footer">
      <Avatar :user="post.creator"></Avatar>
      <div class="column col-auto">
        <a v-for="tag in post.tags" :key="tag.title" :href="'/tags/' + tag.url + '/'">{{tag.title}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "./../components/avatar.vue";

export default {
  props: ["post", "cut"],
  components: {
    Avatar
  }
};
</script>

<style scoped>
.article {
  margin-bottom: 26px;
  background: #ffffff;
  padding: 12px;
}

.subtitle {
  font-size: 0.8em;
}

.article-footer {
  margin-top: 12px;
  padding-top: 6px;
  border-top: 1px solid #999999;
}

hr {
  border: none;
  border-top: 1px solid #cccccc;
}
</style>
