'use strict'

const Vue = require('vue')

new Vue({
	el: '#app',
	render: function (h) {
		return h(require('./components/app.vue'))
	}
})
