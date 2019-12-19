<template>
  <user-edit-view :user="Object.assign({}, user)"></user-edit-view>
</template>

<script>
import { mapState } from 'vuex'
import UserEditView from '@/components/UserEditView.vue'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Редактирование профиля'
    }
  },
  created () {
    if (!this.user) {
      this.$router.replace({ path: '/' })
      return
    }
  },
  methods: {
    editUser (user) {
      this.$store.dispatch('users/editSelf', { user: user })
        .then(_data => {
          return this.$store.dispatch('users/getSelf')
        })
        .then(_data => {
          this.$router.replace({ name: 'user', params: { user: this.user.username } })
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    editAvatar (avatar) {
      this.$store.dispatch('users/editAvatar', { file: avatar })
        .then(_data => {
          return this.$store.dispatch('users/getSelf')
        })
        .then(_data => {
          this.$router.replace({ name: 'user', params: { user: this.user.username } })
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
  },
  components: {
    UserEditView
  }
}
</script>
