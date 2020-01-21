<template>
  <div class="container">
    <div class="columns">
      <div class="column col-6 col-md-2">
        <div class="card">
          <div class="card-body">
            <div class="columns">
              <div class="column col-auto">
                <h1 class="mb-2"><i class="icon icon-people"></i></h1>
              </div>
              <div class="column col-auto">
                <h3 class="mb-0">{{ totalUsers }}</h3>
                Всего пользователей зарегистрировано
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column col-6 col-md-2">
        <div class="card">
          <div class="card-body">
            <div class="columns">
              <div class="column col-auto">
                <h1 class="mb-2"><i class="icon icon-time"></i></h1>
              </div>
              <div class="column col-auto">
                <h3 class="mb-0">{{ activeUsers }}</h3>
                Активные пользователи
              </div>
            </div>
          </div>
        </div>
      </div>
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
