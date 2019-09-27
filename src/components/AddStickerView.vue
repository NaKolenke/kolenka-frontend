<template>
  <div class="form-group">
    <div class="form-group">
      <label class="form-label" for="sticker-name">Имя стикера</label>
      <input class="form-input" v-model="stickerName" name="sticker-name" id="sticker-name" />
    </div>
    <image-upload @complete="stickerUploaded"></image-upload>
  </div>
</template>

<script>
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import errors from '@/utils/errors'

export default {
  data () {
    return {
      stickerName: ''
    }
  },
  methods: {
    stickerUploaded (images) {
      const sticker = images[0]
      this.$store.dispatch('stickers/add', { name: this.stickerName, file_id: sticker.id })
        .then(data => {
          console.log(data)
          this.$toast.show('Стикер добавлен')
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
