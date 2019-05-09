<template>
  <div>
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
  </div>
</template>

<script>
import FeedbackListView from '@/components/FeedbackListView.vue'
import FeedbackPrompt from '@/components/FeedbackPrompt.vue'
import FeedbackService from '@/services/feedback'

export default {
  data: function () {
    return {
      feedbacks: []
    }
  },
  created: function () {
    if (this.isAdmin) {
      this.refreshFeedbacks()
    }
  },
  methods: {
    refreshFeedbacks: function () {
      FeedbackService.getList().then(data => {
        this.feedbacks = data
      }).catch(err => {
        console.log(err)

        this.$router.replace({ path: '/401' })
      })
    },
    resolved: function (id) {
      this.feedbacks.filter(f => f.id == id)[0].is_resolved = true
    }
  },
  components: {
    FeedbackListView,
    FeedbackPrompt
  },
  computed: {
    isAdmin: function () {
      if (!this.$meta.data.user) {
        return false
      }
      return this.$meta.data.user.is_admin
    }
  }
}
</script>
