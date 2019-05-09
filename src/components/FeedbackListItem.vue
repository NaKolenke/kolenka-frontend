<template>
  <div class="column col-12 p-2">
    <div class="columns">
      <div class="column col-1">
        <avatar-view :user="feedback.user" :size="'lg'" :card="true"></avatar-view>
      </div>
      <div class="column col-9">{{feedback.text}}</div>
      <div class="column col-2">
        <span v-if="feedback.is_resolved">Разрешено</span>
        <input
          v-else
          class="btn btn-primary float-left"
          type="submit"
          value="Разрешить"
          @click="send"
        >
      </div>
    </div>
  </div>
</template>

<script>
import AvatarView from '@/components/AvatarView.vue'
import FeedbackService from '@/services/feedback'

export default {
  props: ['feedback'],
  components: {
    AvatarView
  },
  methods: {
    send () {
      FeedbackService
        .resolve(this.feedback.id)
        .then(data => {
          this.$parent.resolved(this.feedback.id)
          this.$toast.show('Готово!')
        })
        .catch(err => {
          console.log(err)
          this.$toast.show('Произошла ошибка при отправке запроса, напишите об этом одному из разработчиков')
        })
    }
  }
}
</script>
