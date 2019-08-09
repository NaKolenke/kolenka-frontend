<template>
  <div class="container columns">
    <div class="column col-6 col-md-2">
      Всего пользователей зарегестрировано: {{total}}
    </div>
    <div class="column col-6 col-md-2">
      Активные пользователи: {{active_7}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ...this.mapData({
        auth: 'auth/data',
        admin: 'admin/everything'
      }),
      total: 0,
      active_7: 0
    }
  },
  created() {
    if (!this.isAdmin) {
      this.$router.push({ path: '/404' })
      return
    }
    
    this.$admin.getDashboard().then(data => {
      this.total = data.users
      this.active_7 = data.active_users_7_days
    }).catch(err => {
      this.isLoading = false
      console.log(err)

      this.$router.push({ path: '/404' })
    })
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
}
</script>
