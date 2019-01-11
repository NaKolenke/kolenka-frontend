'use strict'

const Vue = require('vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter)

const routes = [
	{ path: '/login', component: require('./components/login.vue') },
	{ path: '/register', component: require('./components/register.vue') },
]

const router = new VueRouter({ routes })

new Vue({
	el: '#app',
	render: function (h) {
		return h(require('./components/app.vue'))
	},
	router
})
