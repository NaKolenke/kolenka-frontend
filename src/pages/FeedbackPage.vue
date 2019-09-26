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
import { mapState } from 'vuex'
import FeedbackListView from '@/components/FeedbackListView.vue'
import FeedbackPrompt from '@/components/FeedbackPrompt.vue'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Обратная связь'
    }
  },
  data () {
    return {
      feedbacks: []
    }
  },
  created () {
    if (!this.user) {
      this.$router.replace({ path: '/' })
      return
    }

    if (this.isAdmin) {
      this.refreshFeedbacks()
    }
  },
  methods: {
    refreshFeedbacks () {
      this.feedbacks = []

      this.$store.dispatch('feedback/getList')
        .then(data => {
          this.feedbacks = data.feedback
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    resolved (id) {
      this.$store.dispatch('feedback/resolve', { id: id })
        .then(_data => {
          this.feedbacks.filter(f => f.id == id)[0].is_resolved = true
          this.$toast.show('Готово!')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$toast.show('Произошла ошибка при отправке запроса, напишите об этом одному из разработчиков')
        })
    },
    send (text) {
      this.$store.dispatch('feedback/send', { text: text })
        .then(_data => {
          this.$router.replace({ path: '/' })
          this.$toast.show('Ваш отзыв отправлен')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$toast.show('Произошла ошибка при отправке отзыва, напишите об этом одному из разработчиков')
        })
    }
  },
  components: {
    FeedbackListView,
    FeedbackPrompt
  },
  computed: {
    isAdmin () {
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    },
    ...mapState({
      user: state => state.users.me
    }),
  }
}
</script>
