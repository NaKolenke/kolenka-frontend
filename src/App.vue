<template>
  <div id="app">
    <header-component :version="version" />

    <div class="container col-9 col-mx-auto col-xl-11 col-md-12">
      <div class="columns">
        <div :class="['column', { 'col-9': showSidebar }, { 'col-12': !showSidebar }, 'col-md-12']">
          <router-view />
        </div>

        <div v-if="showSidebar" id="sidebar" class="column col-3 col-md-12">
          <router-view name="sidebar" />
        </div>
      </div>
    </div>

    <vue-progress-bar />
  </div>
</template>

<script>
import Vue from 'vue'
import ProgressBar from 'vue-progressbar'
import HeaderComponent from '@/components/TheHeader.vue'
import ToastPlugin from '@/plugins/toast'
import LogPlugin from '@/plugins/log'
import store from '@/library/index'
import ScrollTo from 'vue-scrollto'
import VueMeta from 'vue-meta'
import '@/directives/validate'
import df from '@/mixins/dataFetch'

Vue.use(ScrollTo)
Vue.use(ProgressBar)
Vue.use(ToastPlugin)
Vue.use(LogPlugin)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.use(store)

export default {
  name: 'App',
  metaInfo: () => ({
    titleTemplate: '%s - На коленке'
  }),
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
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
  dataFetch() {
    return this.$auth
    .login()
    .then(() => this.$blogs.getUserBlogs(this.auth.user.username, { limit: 100 }, true))
    .then(() => this.$notifications.getAll({ page: 1, limit: 1 }))
    .catch(err => {
      this.$log.error(err)
    })
  },
  computed: {
    showSidebar() {
      return !this.$route.matched[0].props.sidebar || !this.$route.matched[0].props.sidebar.hide
    }
  },
  components: {
    HeaderComponent
  },
  mixins: [ df ]
}
</script>

<style lang="scss">

// colors should be overriden before any spectre import
$primary-color: #0D93B0;
$secondary-color: lighten($primary-color, 58%);

@import "../node_modules/spectre.css/src/spectre.scss";
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

@import '../node_modules/spectre.css/src/_variables.scss';

// Tables override for editor (so we don't need to specify .table every time)
.form-group {
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

a:focus, a:hover, a:visited {
  color: $primary-color;
}

html, body {
  height:100%;
}
</style>

