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
import Sticker from '@/components/elements/Sticker.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import stickersApi from '@/api/stickers'

export default {
  data() {
    return {
      ...this.mapData({
        auth: 'auth/data',
        admin: 'admin/everything'
      }),
      totalUsers: 0,
      activeUsers: 0,
      stickers: [],
      stickerName: ''
    }
  },
  created() {
    if (!this.isAdmin) {
      this.$router.push({ path: '/404' })
      return
    }
    
    this.$admin.getDashboard().then(data => {
      this.totalUsers = data.users
      this.activeUsers = data.active_users_7_days
    }).catch(err => {
      this.isLoading = false
      console.log(err)

      this.$router.push({ path: '/404' })
    })
    stickersApi
      .getAllStickers()
      .then(data => this.stickers = data.stickers)

  },
  methods: {
    stickerUploaded(images) {
      const sticker = images[0]
      
      stickersApi
        .addSticker(this.stickerName, sticker.id)
        .then(data => {
          console.log(data)
          this.$toast.show('Стикер добавлен')
          this.stickers.push(data.sticker)
        })
        .catch(err => {
          console.log(err)
          this.$toast.error('Ошибка при загрузке стикера: ' + err)
        })
      // TODO replace code that lies below
      // this.$users.routes.editAvatar(avatar.id, this.$auth.data.accessToken.token).then(res => {
      //   if (res.success !== 1) {
      //     return Promise.reject(res.error)
      //   }

      //   this.$auth.data.user = res.user
      // }).catch(err => {
      //   this.$log.error(err)
      //   this.$toast.show('Не удалось изменить аватар')
      // })
    }
  },
  computed: {
    isAdmin: function () {
      if (!this.auth.user) {
        return false
      }
      return this.auth.user.is_admin
    },
    isLocal() {
      return window.location.hostname === 'localhost'
    }
  },
  components: {
    Sticker,
    ImageUpload
  }
}
</script>
