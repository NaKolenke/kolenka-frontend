<template>
  <div id="app">
    <header-component
      :user="user"
      :version="version"
    ></header-component>
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'
import HeaderComponent from '@/components/TheHeader.vue'
import Toast from '@/components/ToastView.vue'
import Config from '@/config.json'
import UserService from '@/services/user'

let ToastClass = Vue.extend(Toast)

export default {
  name: 'App',
  data: function () {
    return {
      user: undefined,
      version: Config.version,
      toasts: []
    }
  },
  mounted: function () {
    this.refreshUser()
  },
  components: {
    HeaderComponent
  },
  methods: {
    showToast: function (msg) {
      let y = this.toasts.map(i => {
        return i.$el.offsetHeight + 8 // todo remove this hardcoded margin height
      }).reduce((a, b) => a + b, 0)

      let instance = new ToastClass({
        propsData: {
          y: y
        }
      })

      instance.$slots.default = [msg]
      instance.$root = this
      instance.$mount()

      this.$el.appendChild(instance.$el)
      this.toasts.push(instance)

      setTimeout(() => {
        this.hideToast(instance)
      }, 3000)
    },
    hideToast: function (t) {
      let index = 0
      let height = 0

      for (let i = 0; i < this.toasts.length; i++) {
        if (this.toasts[i] === t) {
          index = i
          height = t.$el.offsetHeight
          this.$el.removeChild(t.$el)
          this.toasts.splice(i, 1)
          break
        }
      }

      for (let i = index; i < this.toasts.length; i++) {
        this.toasts[i].y -= height
      }
    },
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
