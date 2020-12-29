import 'core-js/stable'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import './assets/styles/extended.scss'

import Moment from 'moment'
import 'moment/locale/ru'

Vue.config.productionTip = false

Moment.locale('ru')
Vue.filter('moment', function (timestamp) {
  return Moment.unix(timestamp).format('LLL')
})
Vue.filter('moment_date', function (timestamp) {
  return Moment.unix(timestamp).format('LL')
})

window.__app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
