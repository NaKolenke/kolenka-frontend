<template>
  <div v-if="post">
    <template v-if="loading.post">
      <post-skeleton />
    </template>
    <post-view v-else :post="post" :cut="false"></post-view>

    <div
      class="container my-2"
      v-if="post.jam_entries && post.jam_entries.length > 0"
    >
      <h3>К этому посту прилинкованы заявки:</h3>
      <div class="columns">
        <div
          class="column col-2"
          v-for="entry in post.jam_entries"
          :key="entry.id"
        >
          <router-link
            :to="{
              name: 'jam-entry',
              params: { jamUrl: entry.jam.url, entryUrl: entry.url },
            }"
            class="text-center"
          >
            <div>
              <jam-entry-logo :entry="entry" />
            </div>
            <p>
              {{ entry.title }}
            </p>
          </router-link>
        </div>
      </div>
    </div>

    <comments-section v-if="post && !post.is_draft" :postUrl="post.url" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

import PostView from '@/components/PostView.vue'

import CommentsSection from '@/components/comments/CommentsSection.vue'
import PostSkeleton from '@/components/skeletons/Post.vue'
import JamEntryLogo from '@/components/elements/JamEntryLogo.vue'

export default {
  metaInfo () {
    var title = 'Запись'
    if (this.post) {
      title = this.post.title
    }

    return {
      title: title
    }
  },
  data: function () {
    return {
      loading: {
        comments: true,
        post: true
      }
    }
  },
  created () {
    this.$store.dispatch('posts/resetCurrentPost')
  },
  mounted () {
    this.refreshPost(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPost(to)
    next()
  },
  methods: {
    refreshPost (route) {
      this.$store.dispatch('posts/getPost', { url: route.params.post })
        .then(_post => {
          this.loading.post = false
        })
        // .then(() => this.refreshComments(route))
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
          this.$router.push({ path: '/404' })
        })
    },
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
      post: state => state.posts.current
    }),
  },
  components: {
    PostView,
    PostSkeleton,
    CommentsSection,
    JamEntryLogo
  }
}
</script>

<style scoped>
.relevant {
  list-style: none;
  margin: 0;
}

.relevant li {
  margin-top: 0;
  margin-bottom: 0.4rem;
}
</style>

<style>
#comments_container > .comment {
  border: none;
}
#comments_container > .comment > .card-body {
  padding-left: 0;
}
</style>

