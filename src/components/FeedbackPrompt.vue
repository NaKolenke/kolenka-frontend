<template>
  <div class="column col-12 py-2">
    <form method="POST" @submit.prevent="send" :class="{ 'has-error': showErrors }">
      <div class="form-group">
        <label class="form-label" for="feedback">Отзыв</label>
        <textarea class="form-input" v-model="feedback" v-validate="validation" name="feedback"></textarea>
        <div class="form-input-hint" v-if="!validation.success && showErrors">Введите текст отзыва</div>
      </div>

      <input type="submit" id="send-btn" class="btn primary" />
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      feedback: '',
      validation: {
        length: () => this.feedback.length >= 10
      },
      showErrors: false
    }
  },
  methods: {
    send () {
      if (!this.validation.success) {
        this.showErrors = true
        return
      } else {
        this.showErrors = false
      }

      this.$parent.send(this.feedback)
    }
  }
}
</script>
