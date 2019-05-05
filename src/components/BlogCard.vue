<template>
  <div class="container columns">
    <div class="column col-2">
      <avatar-view :user="blog.creator" :size="'lg'"></avatar-view>
    </div>
    <div class="column col-10">
      <h3>{{ blog.title }}</h3>
      <p>{{ blog.description }}</p>

      <div v-if="posts.length > 0" class="columns">
        <div class="column col-6" v-for="item in posts" :key="item.id">
          <div class="card my-1">
            <div class="card-header">
              <div class="card-title h5"><a :href="'/posts/' + item.url">{{ item.title }}</a></div>
              <div class="card-subtitle text-gray">{{ item.updated_date | moment }} / {{ item.creator.name }}</div>
            </div>
            <div class="card-body">
              <p v-html="item.cut_text.substring(0, 256)"></p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty">
        <p class="empty-title h5">В этом блоге еще нет записей</p>
      </div>

    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'
import BlogService from '@/services/blogs'

export default {
  props: [ 'blog' ],
  data() {
    return {
      posts: []
    }
  },
  components: {
    AvatarView
  },
  mounted () {
    this.refresh()
  },
  methods: {
    refresh: function () {
      BlogService.getBlogPosts(this.blog.url).then(data => {
        this.posts = data.posts.length > 2 ? data.posts.slice(0, 2) : data.posts
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
.card-body img {
  width: 100%;
  height: auto;
}
</style>
