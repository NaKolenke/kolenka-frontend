// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Moment from 'moment'
import 'moment/locale/ru'

Vue.config.productionTip = false

Moment.locale('ru')
Vue.filter('moment', function (timestamp) {
  return Moment.unix(timestamp).format('LLL')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
