<template>
  <div id="app" v-if="!loadingUser">
    <header-component
      :user="meta.user"
      :version="version"
    />
    <router-view />
    <vue-progress-bar />
  </div>
</template>

<script>
import Vue from 'vue'
import ProgressBar from 'vue-progressbar'
import HeaderComponent from '@/components/TheHeader.vue'
import UserService from '@/services/user'
import ToastPlugin from '@/plugins/toast'
import store from '@/library'
import ScrollTo from 'vue-scrollto'

Vue.use(ScrollTo)

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
      version: process.env.VUE_APP_VERSION,
      loadingUser: true
    }
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

    this.refreshUser().then(() => {
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

          this.loadBlogs(res.user.username)
        })
        .catch(err => {
          console.log(err)
          this.$meta.data.user = null
          UserService.logout()
        })
        .then(() => {
          this.loadingUser = false
        })
    },
    loadBlogs(username) {
      UserService.getUserBlogs(username).then(res => {
        this.$userBlogs.collect(res.blogs, 'everything')

        if (res.meta.page_count > 1) {
          for (let i = 2; i < res.meta.page_count; i++) {
            this.loadBlogPage(username, i)
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loadBlogPage(username, page) {
      UserService.getUserBlogs(username, page).then(res => {
        this.$userBlogs.collect(res.blogs, 'everything')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>
@import "../node_modules/spectre.css/dist/spectre.css";
@import "../node_modules/spectre.css/dist/spectre-icons.css";
@import "./assets/icon-font/style.css";

ul li p:first-child,
ol li p:first-child {
  display: inline-block;
}

img {
  max-width:100%;
}

.text-left {
  text-align: left;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.container {
  margin-top: 20px;
}
</style>

<style lang="scss">
@import '../node_modules/spectre.css/src/_variables.scss';

// Tables override (so we don't need to specify .table every time)
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  @if $rtl == true {
    text-align: right;
  } @else {
    text-align: left;
  }

  &.table-striped {
    tbody {
      tr:nth-of-type(odd) {
        background: $bg-color;
      }
    }
  }

  &,
  &.table-striped {
    tbody {
      tr {
        &.active {
          background: $bg-color-dark;
        }
      }
    }
  }

  &.table-hover {
    tbody {
      tr {
        &:hover {
          background: $bg-color-dark;
        }
      }
    }
  }

  // Scollable tables
  &.table-scroll {
    display: block;
    overflow-x: auto;
    padding-bottom: .75rem;
    white-space: nowrap;
  }

  td,
  th {
    border: $border-width solid $border-color;
    padding: $unit-3 $unit-2;
  }
  th {
    border-bottom-width: $border-width-lg;
  }
}

// Code block styles

pre {
  border: $border-width solid $border-color;
  background: $light-color;
  border-radius: $border-radius;
  padding: $control-padding-x-lg;
  overflow: auto;
}

pre code {
  background: none;
  //color: $highlight-color;
  padding: 0;
}

pre {
  code {
    @import '../node_modules/highlight.js/styles/a11y-light.css';
  }
}

.bottom-padd {
  margin-top: 50px;
}

p {
  margin: 0 0 $line-height / 1.5;
}
</style>

