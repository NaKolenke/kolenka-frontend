'use strict'

const Vue = require('vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter)

const routes = [
	{ path: '/', component: require('./pages/home.vue') },
	{ path: '/login', component: require('./pages/login.vue'), meta: {
		requiresUnAuth: true
	} },
	{ path: '/register', component: require('./pages/register.vue'), meta: {
		requiresUnAuth: true
	} },
	{ path: '/doc', component: require('./pages/doc.vue') },
	{ path: '/404', component: require('./pages/404.vue') },
	{ path: '/logout', meta: {
		logout: true
	} },
	{ path: '*', redirect: '/404' }
]

const router = new VueRouter({ routes })
const appView = require('./components/app.vue')
const Toast = require('./components/toast.vue')
const cookie = require('js-cookie')
const config = require('./config.json')

let ToastClass = Vue.extend(Toast)

let app = new Vue({
	el: '#app',
	render: function (h) {
		return h(appView, {
			props: {
				user: this.user
			}
		})
	},
	router,
	data: {
		toasts: [],
		user: null
	},
	mounted: function() {
		let data = cookie.getJSON('tokens')

		if (data)
			this.login(data)
	},
	methods: {
		showToast: function(msg) {
			let y = this.toasts.map(i => {
				return i.$el.offsetHeight
			}).reduce((a, b) => a + b, 0)
			
			let instance = new ToastClass({
				propsData: {
					y: y
				}
			})

			instance.$slots.default = [ msg	]
			instance.$root = this
			instance.$mount()
			
			this.$el.appendChild(instance.$el)
			this.toasts.push(instance)
		},
		hideToast: function(t) {
			let index = 0
			let height = 0

			for (let i = 0; i < this.toasts.length; i++) {
				if (this.toasts[i] == t) {
					index = i;
					height = t.$el.offsetHeight
					this.$el.removeChild(t.$el)
					this.toasts.splice(i, 1)
					break
				}
			}

			for (let i = index; i < this.toasts.length; i++) {
				this.toasts[i].y -= height
			}
		},
		login: function(data) {

			cookie.set('tokens', data, {
				expires: 7
			})

			this.user = {
				tokens: data,
				data: null
			}

			console.log(data)

			fetch(config.apiUrl + '/users/self/', {
				headers: {
					'Authorization': this.user.tokens.access_token.token
				}
			}).then(res => {
				return res.json()
			}).then(res => {
				this.user.data = res.user
			})
		}
	}
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresUnAuth)) {
		if (app.user) {
			next({
				path: '/'
			})
		} else {
			next()
		}
	} else if (to.matched.some(record => record.meta.logout)) {
		if (app.user) {
			app.user = null
			cookie.remove('tokens')
			return next({
				path: '/'
			})
		}
		next()
	}	else {
		next()
	}
})
