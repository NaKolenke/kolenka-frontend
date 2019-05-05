<template>
  <div id="app">
     <header-component
      :user="user"
      :version="version"
    ></header-component>
    <router-view />
    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
import Vue from 'vue'
import ProgressBar from 'vue-progressbar'
import HeaderComponent from '@/components/TheHeader.vue'
import UserService from '@/services/user'
import ToastPlugin from '@/plugins/toast'

Vue.use(ProgressBar)
Vue.use(ToastPlugin)

export default {
  name: 'App',
  data: function () {
    return {
      user: undefined,
      version: process.env.VUE_APP_VERSION,
      toasts: []
    }
  },
  mounted: function () {
    this.refreshUser()
    this.$Progress.finish()
  },
  created() {
    this.$Progress.start()

    //  hook the progress bar to start before we move router-view
    this.$router.beforeEach((to, from, next) => {
      //  does the page we want to go to have a meta.progress object
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        // parse meta tags
        this.$Progress.parseMeta(meta)
      }
      //  start the progress bar
      this.$Progress.start()
      //  continue to next page
      next()
    })
    //  hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to, from) => {
      //  finish the progress bar
      this.$Progress.finish()
    })
  },
  components: {
    HeaderComponent
  },
  methods: {
    refreshUser: function () {
      UserService
        .getSelf()
        .then(res => {
          if (res.success === 1) {
            this.user = res.user
            this.$root.user = this.user
          } else {
            this.user = null
            this.$root.user = this.user
            UserService.logout()
          }
        }).catch(err => {
          console.log(err)
          this.user = null
          this.$root.user = this.user
          UserService.logout()
        })
    }
  }
}
</script>

<style>
@import "../node_modules/spectre.css/dist/spectre.css";

#app {
}

.container {
  margin-top: 20px;
}
</style>
