<template>
  <div id="app">
    <header-component :version="version" />

    <div class="container col-9 col-mx-auto col-xl-11 col-md-12">
      <div class="columns">
        <div :class="['column', { 'col-9': showSidebar }, { 'col-12': !showSidebar }, 'col-md-12']">
          <router-view />
        </div>

        <div
          v-if="showSidebar"
          id="sidebar"
          class="column col-3 col-md-12"
          style="position: relative"
        >
          <transition name="sidebar-fade" mode="in-out">
            <router-view name="sidebar" />
          </transition>
        </div>
      </div>
    </div>

    <vue-progress-bar />
    <footer-component />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import ProgressBar from 'vue-progressbar'
import HeaderComponent from '@/components/TheHeader.vue'
import FooterComponent from '@/components/TheFooter.vue'
import ToastPlugin from '@/plugins/toast'
import LogPlugin from '@/plugins/log'
import ScrollTo from 'vue-scrollto'
import VueMeta from 'vue-meta'
import '@/directives/validate'
import df from '@/mixins/dataFetch'
import Pagination from './models/pagination'
import errors from '@/utils/errors'

Vue.use(ScrollTo)
Vue.use(ProgressBar, {
  color: '#fff'
})
Vue.use(ToastPlugin)
Vue.use(LogPlugin)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

export default {
  name: 'App',
  metaInfo: () => ({
    titleTemplate: '%s - На коленке'
  }),
  data () {
    return {
      version: process.env.VUE_APP_VERSION
    }
  },
  created () {
    this.$Progress.start()

    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })

    this.$router.afterEach(() => {
      this.$Progress.finish()
    })

    this.$Progress.finish()
  },
  dataFetch () {
    return this.refreshUserData()
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
    showSidebar () {
      return !this.$route.matched[0].props.sidebar || !this.$route.matched[0].props.sidebar.hide
    }
  },
  methods: {
    refreshUserData () {
      return this.$store.dispatch('auth/loadTokensFromStorage')
        .then(tokens => {
          if (tokens == null) {
            return Promise.reject({ silent: true })
          }
          return this.$store.dispatch('auth/restoreToken')
        })
        .then(_res => {
          return this.$store.dispatch('users/getSelf')
        })
        .then(me => {
          return this.$store.dispatch('blogs/getMyBlogs', { username: me.username, pagination: new Pagination(1, 100) })
        })
        .then(_res => {
          return this.$store.dispatch('notifications/getAll', { pagination: new Pagination(1, 100) })
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  components: {
    HeaderComponent,
    FooterComponent
  },
  mixins: [df]
}
</script>

<style scoped>
.sidebar-fade-enter-active,
.sidebar-fade-leave-active {
  transition-duration: 0.3s;
  transition-property: all;
  transition-timing-function: ease;
}

.sidebar-fade-enter,
.sidebar-fade-leave-active {
  opacity: 0;
}

.sidebar-fade-leave-active {
  position: absolute;
}
</style>

<style lang="scss">
// colors should be overriden before any spectre import
$primary-color: #0d93b0;
$secondary-color: lighten($primary-color, 58%);

@import "../node_modules/spectre.css/src/spectre.scss";
@import "../node_modules/spectre.css/dist/spectre-icons.css";
@import "./assets/icon-font/style.css";

ul li p:first-child,
ol li p:first-child {
  display: inline;
}

img {
  max-width: 100%;
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

@import "../node_modules/spectre.css/src/_variables.scss";

// Tables override for editor (so we don't need to specify .table every time)
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
    padding-bottom: 0.75rem;
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
    @import "../node_modules/highlight.js/styles/a11y-light.css";
  }
}

.bottom-padd {
  margin-top: 50px;
}

p {
  margin: 0 0 $line-height / 5;
}

a:focus,
a:hover,
a:visited {
  color: $primary-color;
}

html,
body {
  height: 100%;
}

#app {
  min-height: 100%;
  position: relative;
  padding-bottom: 32px;
}
</style>

