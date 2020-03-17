<template>
  <div class="form-group">
    <div class="form-group">
      <label class="form-label" for="achievement-name">Имя награды</label>
      <input
        class="form-input"
        v-model="achievementName"
        name="achievement-name"
        id="achievement-name"
      />
    </div>
    <image-upload @complete="achievementUploaded"></image-upload>
  </div>
</template>

<script>
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import errors from '@/utils/errors'

export default {
  data () {
    return {
      achievementName: ''
    }
  },
  methods: {
    achievementUploaded (images) {
      const achievement = images[0]
      this.$store.dispatch('achievements/add', { title: this.achievementName, file_id: achievement.id })
        .then(_ => {
          this.$toast.show('Награда добавлен')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  components: {
    ImageUpload
  }
}
</script>
