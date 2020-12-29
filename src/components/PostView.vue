<template>
  <div class="article">
    <span class="subtitle">
      <span v-if="post.blog">
        <router-link :to="{ name: 'blog',  params: { name: post.blog.url }}">{{ post.blog.title }}</router-link>,
      </span>
      {{ post.created_date | moment }}
    </span>
    <h2>
      <router-link
        v-if="canEdit"
        :to="{ name: 'edit-post', params: { post: post.url, object: post } }"
        class="btn btn-sm btn-link tooltip tooltip-right"
        data-tooltip="Редактировать запись"
      >
        <i class="icon icon-edit"></i>
      </router-link>
      <router-link
        :to="{ name: 'post',  params: { post: post.url, blog: post.blog, user: post.creator }}"
      >
        <small v-if="post.is_draft" class="label label-secondary h6">черновик</small>
        <br v-if="post.is_draft" />
        {{ post.title }}
      </router-link>
    </h2>

    <post-body v-if="cut" :html="post.cut_text" />
    <post-body v-else :html="post.text" />
    <cut v-if="cut && post.has_cut" :name="post.cut_name" :url="post.url" />

    <div class="columns article-footer">
      <div class="column col-lg-auto">
        <avatar :user="post.creator" :size="'sm'" />
        <span class="chip">
          <router-link
            :to="{ name: 'user', params: { user: post.creator.username }}"
          >{{ post.creator.name || post.creator.username }}</router-link>
        </span>
        <router-link
          :to="{ name: 'post',  params: { post: post.url, blog: post.blog, user: post.creator }, hash: '#comments' }"
          title="Комментарии"
        >
          <span class="chip">
            <span class="icon-bubble2"></span>
            <span class="pl-2">{{ post.comments }}</span>
          </span>
        </router-link>
        <span v-for="tag in post.tags" :key="tag.id" class="chip">
          <router-link
            :to="{ name: 'tag',  params: { title: tag.title }}"
            v-if="tag.title"
          >#{{ tag.title }}</router-link>
        </span>
        <vote
          class="float-right"
          :rating="post.rating"
          :votedUp="post.user_voted > 0"
          :votedDown="post.user_voted < 0"
          :id="post.id"
          :type="'post'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Avatar from '@/components/elements/Avatar.vue'
import Cut from '@/components/elements/Cut.vue'
import PostBody from '@/components/PostBody.vue'
import Vote from '@/components/Vote.vue'
import wrapCode from '@/utils/wrapCode'
import wrapYoutube from '@/utils/wrapYoutube'
import resizeTweet from '@/utils/resizeTweet'

export default {
  props: {
    post: Object, // Post object
    cut: Boolean // Show cut
  },
  mounted () {
    if (this.$el.querySelectorAll) {
      wrapCode(this.$el)
      wrapYoutube(this.$el, this)
      resizeTweet(this.$el)
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
    canEdit () {
      if (this.user) {
        if (this.user.id === this.post.creator.id) {
          return true
        }
        if (this.post.blog) {
          if (this.user.id === this.post.blog.creator.id) {
            return true
          }
        }
        return this.user.is_admin
      }
      return false
    }
  },
  components: {
    Avatar,
    PostBody,
    Cut,
    Vote
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
