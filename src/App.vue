<template>
  <div id="app">
     <header-component
      :user="meta.user"
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
import store from '@/library'

Vue.use(ProgressBar)
Vue.use(ToastPlugin)

Vue.use(store)

export default {
  name: 'App',
  data: function () {
    return {
      ...this.mapData({
        meta: 'meta/data/user'
      }),
      version: process.env.VUE_APP_VERSION
    }
  },
  mounted: function () {
    this.refreshUser().then(() => {
      this.$Progress.finish()
    })
  },
  created() {
    this.$Progress.start()

    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })

    this.$router.afterEach((to, from) => {
      this.$Progress.finish()
    })
  },
  components: {
    HeaderComponent
  },
  methods: {
    refreshUser () {
      return UserService
        .getSelf()
        .then(res => {
          this.$meta.data.user = res.user
        })
        .catch(err => {
          console.log(err)
          this.$meta.data.user = null
          UserService.logout()
        })
    }
  }
}
</script>

<style>
@import "../node_modules/spectre.css/dist/spectre.css";
@import "./assets/icons.css";

ul li p:first-child,
ol li p:first-child {
  display: inline-block;
}

#app {
}

.container {
  margin-top: 20px;
}

@media (max-width: 1400px) {
  #sidebar {
    width: 100%;
  }

  #content {
    width: 100%;
  }
}
</style>
