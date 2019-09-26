import 'core-js/stable'
import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

import Moment from 'moment'
import 'moment/locale/ru'

Vue.config.productionTip = false

Moment.locale('ru')
Vue.filter('moment', function (timestamp) {
  return Moment.unix(timestamp).format('LLL')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
