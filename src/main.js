import Vue from 'vue'
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
  render: h => h(App),
  router,
  components: { App }
}).$mount('#app')
