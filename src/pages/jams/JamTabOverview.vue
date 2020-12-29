<template>
  <div v-if="jam" class="container">
    <post-body :html="jam.description" />

    <div class="my-2 py-2" v-if="jamPosts">
      <h3>Посты, связанные с этим джемом:</h3>
      <router-link
        v-for="post in jamPosts"
        :key="post.id"
        :to="{
          name: 'post',
          params: { post: post.url, blog: post.blog },
        }"
        class="mx-2"
      >
        <small v-if="post.is_draft" class="label label-secondary h6"
          >черновик</small
        >
        <br v-if="post.is_draft" />
        {{ post.title }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PostBody from '@/components/PostBody.vue'

export default {
  metaInfo () {
    return {
      title: 'Джем'
    }
  },
  data: function () {
    return {
    }
  },
  created () {
  },
  methods: {

  },
  computed: {
    ...mapState({
      jam: state => state.jams.current,
      jamPosts: state => state.jams.posts,
    })
  },
  components: {
    PostBody,
  }
}
</script>
