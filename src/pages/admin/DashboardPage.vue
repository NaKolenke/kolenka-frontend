<template>
  <div class="container">
    <div class="columns">
      <div class="column col-6 col-md-2">Всего пользователей зарегестрировано: {{totalUsers}}</div>
      <div class="column col-6 col-md-2">Активные пользователи: {{activeUsers}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

export default {
  data () {
    return {
      totalUsers: 0,
      activeUsers: 0,
    }
  },
  created () {
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
  },
  methods: {
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
    }),
  },
  components: {
  }
}
</script>
