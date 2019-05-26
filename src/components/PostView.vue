<template>
  <div class="article">
    <span class="subtitle">
      <span v-if="post.blog"><router-link :to="{ name: 'blog',  params: { name: post.blog.url }}">{{post.blog.title}}</router-link>, </span>
      {{post.created_date | moment}}
    </span>
    <h2>
      <router-link :to="{ name: 'post',  params: { post: post.url }}">
        <small v-if="post.is_draft" class="label label-secondary h6">черновик</small>
        <br v-if="post.is_draft">
        {{post.title}}
      </router-link>
    </h2>

    <router-link 
      v-if="$meta.data.user && $meta.data.user.id === post.creator.id"
      :to="{ name: 'edit-post', params: { edit: post } }" 
      class="btn btn-sm"
    >Редактировать</router-link>

    <div v-if="cut" v-html="post.cut_text"></div>
    <div v-else v-html="post.text" ></div>

    <router-link
      v-if="cut && post.has_cut"
      :to="{ name: 'post',  params: { post: post.url }}"
      class="btn btn-sm"
    >
      {{ post.cut_name || 'Читать дальше' }}
    </router-link>

    <div class="columns article-footer">
      <div class="column col-lg-auto">
        <avatar :user="post.creator" :size="'sm'" />
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
import Avatar from '@/components/elements/Avatar.vue'
import { wrapCode, wrapYoutube } from '@/utils/vanilla'

export default {
  props: ['post', 'cut'],
  mounted() {
    if (this.$el.querySelectorAll) {
      wrapCode(this.$el)
      wrapYoutube(this.$el)
    }
  },
  components: {
    Avatar
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

<style lang="scss">
.youtube-video {
  position: relative;
}

.youtube-video img {
  position: relative;
  cursor: pointer;
}

.youtube-video span {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  font-size: 64px;
  text-shadow: 0 10px 50px #000;
  cursor: pointer;
  transition: all 1s ease-in-out;
}

.youtube-video:hover span {
  color: #FF0000;
  text-shadow: 4px 4px 50px #fff,
              4px -4px 50px #fff,
              -4px 4px 50px #fff,
              -4px -4px 50px #fff;
  transition: all 1s ease-in-out;
}

.youtube-video div {
  display: inline;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.7);
  color: #f5f5ff;
  z-index: 99;
  padding: 4px;
}
</style>

