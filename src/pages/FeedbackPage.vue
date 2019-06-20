<template>
  <div>
    <div v-if="isAdmin">
      <feedback-list-view :list="feedbacks"></feedback-list-view>
    </div>
    <div>
      <feedback-prompt></feedback-prompt>
    </div>
  </div>
</template>

<script>
import FeedbackListView from '@/components/FeedbackListView.vue'
import FeedbackPrompt from '@/components/FeedbackPrompt.vue'

export default {
  metaInfo() {
    return {
      title: 'Обратная связь'
    }
  },
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      feedbacks: []
    }
  },
  created () {
    if (!this.auth.user) {
      this.$router.replace({ path: '/' })
      return
    }
    
    if (this.isAdmin) {
      this.refreshFeedbacks()
    }
  },
  methods: {
    refreshFeedbacks () {
      this.$feedback.getList().then(data => {
        this.feedbacks = data
      }).catch(err => {
        console.log(err)

        this.$router.replace({ path: '/401' })
      })
    },
    resolved (id) {
      this.feedbacks.filter(f => f.id == id)[0].is_resolved = true
    }
  },
  components: {
    FeedbackListView,
    FeedbackPrompt
  },
  computed: {
    isAdmin () {
      if (!this.auth.user) {
        return false
      }
      return this.auth.user.is_admin
    }
  }
}
</script>
