<template>
  <div class="container">
    <div class="columns">
      <div class="column col-6">
        <h4>Добавить стикер</h4>
        <div class="card">
          <div class="card-body">
            <add-sticker />
          </div>
        </div>
      </div>
      <div class="column col-6">
        <h4>Список активных стикеров</h4>
        <div class="card">
          <div class="card-body">
            <sticker v-for="s in stickers" :key="s.name" :name="s.name" class="tooltip tooltip-bottom" :data-tooltip="s.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Sticker from '@/components/elements/Sticker.vue'
import AddSticker from '@/components/AddStickerView.vue'
import errors from '@/utils/errors'

export default {
  created () {
    if (!this.isAdmin) {
      this.$router.push({ path: '/404' })
      return
    }

    this.$store.dispatch('stickers/getAll')
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
  computed: {
    isAdmin: function () {
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    },
    isLocal () {
      return window.location.hostname === 'localhost'
    },
    ...mapState({
      user: state => state.users.me,
      stickers: state => state.stickers.available
    }),
  },
  components: {
    Sticker,
    AddSticker,
  }
}
</script>

<style lang="scss" scoped>
.sticker {
  float: left;
}
</style>

