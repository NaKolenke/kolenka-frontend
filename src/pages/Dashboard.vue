<template>
  <div class="container">
    <div class="columns">
      <div class="column col-6 col-md-2">
        Всего пользователей зарегестрировано: {{totalUsers}}
      </div>
      <div class="column col-6 col-md-2">
        Активные пользователи: {{activeUsers}}
      </div>
    </div>
    <hr/>
    <div class="columns">
      <div class="column col-8 col-md-2">
        <sticker v-for="s in stickers" :key="s.id" :id="s.id" :fileId="s.file.id" :name="s.name" :showName="true"></sticker>
      </div>
      <div class="column col-4 col-md-2">
        <h4>Добавить стикер</h4>
          <div class="form-group">
          <label class="form-label" for="sticker-name">Имя стикера</label>
          <input
            class="form-input"
            v-model="stickerName"
            name="sticker-name"
            id="sticker-name"
          />
        </div>
        <image-upload @complete="stickerUploaded">
        </image-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sticker from '@/components/elements/Sticker.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import errors from '@/utils/errors'

export default {
  data() {
    return {
      totalUsers: 0,
      activeUsers: 0,
      stickerName: ''
    }
  },
  created() {
    if (!this.isAdmin) {
      this.$router.push({ path: '/404' })
      return
    }
    this.$store.dispatch('admin/getDashboard')
      .then(data => {
        this.totalUsers = data.users
        this.activeUsers = data.active_users_7_days
      }).catch(error => {
        this.isLoading = false

        errors.handle(error)
        this.$toast.error(errors.getText(error))
      })

    this.$store.dispatch('stickers/getAll')
  },
  methods: {
    stickerUploaded(images) {
      const sticker = images[0]
      this.$store.dispatch('stickers/add', {name: this.stickerName, file_id: sticker.id})
        .then(data => {
          console.log(data)
          this.$toast.show('Стикер добавлен')
        })
        .catch(error=> {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    isAdmin: function () {
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    },
    isLocal() {
      return window.location.hostname === 'localhost'
    },
    ...mapState({
      user: state => state.users.me,
      stickers: state => state.stickers.available
    }),
  },
  components: {
    Sticker,
    ImageUpload
  }
}
</script>
