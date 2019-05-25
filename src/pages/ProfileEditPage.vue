<template>
  <div>
    <div class="container col-9 col-mx-auto">
      <div class="columns">
        <div id="content" class="column col-9">
          <profile-edit-view v-if="user.username" :user="user"></profile-edit-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileEditView from '@/components/ProfileEditView.vue'
import UserService from '@/services/user'

export default {
  data () {
    return {
      user: {}
    }
  },
  created () {
    this.refreshUser(this.$route)
  },
  methods: {
    refreshUser (route) {
      UserService.getSelf().then(data => {
        this.user = data.user
      }).catch(err => {
        console.log(err)

        this.$router.replace({ path: '/401' })
      })
    },
    editUser (user) {
      UserService.editSelf(user).then(data => {
        this.$router.replace({ name: 'profile', params: { user: this.user.username } })
      }).catch(err => {
        console.log(err)

        this.$router.replace({ path: '/401' })
      })
    },
    editAvatar (formData) {
      UserService.editAvatar(formData).then(data => {
        this.$router.replace({ name: 'profile', params: { user: this.user.username } })
      }).catch(err => {
        console.log(err)

        this.$router.replace({ path: '/401' })
      })
    }
  },
  components: {
    ProfileEditView
  }
}
</script>
