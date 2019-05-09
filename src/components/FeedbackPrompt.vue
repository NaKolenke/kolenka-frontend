<template>
  <div class="column col-12 py-2">
    <form method="POST" @submit.prevent="send">
      <div class="form-group">
        <label class="form-label" for="feedback">Отзыв</label>
        <textarea  class="form-input" v-model="feedback" name="feedback"></textarea>
      </div>

      <input type="submit" id="send-btn" class="btn primary">
    </form>
  </div>
</template>

<script>
import FeedbackService from '@/services/feedback'

export default {
  data: function () {
    return {
      feedback: ''
    }
  },
  methods: {
    send () {
      FeedbackService
        .send(this.feedback)
        .then(data => {
          this.$router.replace({ path: '/' })
          this.$toast.show('Ваш отзыв отправлен')
        })
        .catch(err => {
          console.log(err)
          this.$toast.show('Произошла ошибка при отправке отзыва, напишите об этом одному из разработчиков')
        })
    }
  }
}
</script>
