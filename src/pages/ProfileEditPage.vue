<template>
  <profile-edit-view :user="auth.user"></profile-edit-view>
</template>

<script>
import ProfileEditView from '@/components/ProfileEditView.vue'

export default {
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      })
    }
  },
  created () {
    if (this.auth.user == null) {
      this.$router.replace({ path: '/401' })
    }
  },
  methods: {
    editUser (user) {
      this.$users.editSelf(user).then(data => {
        this.$router.replace({ name: 'profile', params: { user: this.auth.user.username } })
      }).catch(err => {
        console.log(err)

        this.$toast.error('Не удалось')
      })
    },
    editAvatar (formData) {
      this.$users.editAvatar(formData).then(res => {
        this.$router.replace({ name: 'profile', params: { user: this.auth.user.username } })
      }).catch(err => {
        console.log(err)

        this.$toast.error('Не удалось')
      })
    }
  },
  components: {
    ProfileEditView
  }
}
</script>
