'use strict'

const Vue = require('vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter)

const routes = [
	{ path: '/', component: require('./pages/home.vue') },
	{ path: '/login', component: require('./pages/login.vue') },
	{ path: '/register', component: require('./pages/register.vue') },
	{ path: '/doc', component: require('./pages/doc.vue') },
]

const router = new VueRouter({ routes })
const appView = require('./components/app.vue')

new Vue({
	el: '#app',
	render: function (h) {
		return h(appView)
	},
	router
})
