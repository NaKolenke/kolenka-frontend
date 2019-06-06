<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div v-if="isAdmin" class="column col-12">
        <feedback-list-view :list="feedbacks"></feedback-list-view>
      </div>
      <div class="column col-12">
        <feedback-prompt></feedback-prompt>
      </div>
    </div>
  </div>
</template>

<script>
import FeedbackListView from '@/components/FeedbackListView.vue'
import FeedbackPrompt from '@/components/FeedbackPrompt.vue'

export default {
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      feedbacks: []
    }
  },
  created () {
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
