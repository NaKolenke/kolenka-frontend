<template>
  <div class="article">
    <span class="subtitle">
      <router-link :to="{ name: 'blog',  params: { name: post.blog.url }}">{{post.blog.title}}</router-link>
      , {{post.created_date | moment}}
    </span>
    <h2>
      <router-link :to="{ name: 'post',  params: { post: post.url }}">{{post.title}}</router-link>
    </h2>

    <div v-if="cut" v-html="post.cut_text"></div>
    <div v-else v-html="post.text" ></div>

    <router-link
      v-if="cut && post.has_cut"
      :to="{ name: 'post',  params: { post: post.url }}"
      class="btn btn-sm"
    >{{ post.cut_name || 'Читать дальше' }}</router-link>

    <div class="columns article-footer">
      <div class="column col-lg-auto">
        <avatar-view :user="post.creator" :size="'sm'"></avatar-view>
        <span class="chip">
          {{ post.creator.name || post.creator.username }}
        </span>
        <router-link :to="{ name: 'post',  params: { post: post.url }, hash: '#comments'}" title="Комментарии">
          <span class="chip">
            <span class="icon-bubble2"></span>
            <span style="padding-left:4px">{{ post.comments }}</span>
          </span>
        </router-link>
        <span v-for="tag in post.tags" :key="tag.title" class="chip">
          <router-link :to="{ name: 'tag',  params: { tag: tag.url }}">#{{tag.title}}</router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView'
import hljs from 'highlight.js'

export default {
  props: ['post', 'cut'],
  components: {
    AvatarView
  },
  mounted() {
    let targets = this.$el.querySelectorAll('code')
    targets.forEach((target) => {
      hljs.highlightBlock(target)
    })
  }
}
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
}
</style>
