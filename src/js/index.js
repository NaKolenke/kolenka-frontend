'use strict'

const Vue = require('vue')
const VueRouter = require('vue-router')

Vue.use(VueRouter)

const routes = [
	{ path: '/', component: require('./pages/home.vue') },
	{ path: '/login', component: require('./pages/login.vue') },
	{ path: '/register', component: require('./pages/register.vue') },
	{ path: '/doc', component: require('./pages/doc.vue') },
	{ path: '/404', component: require('./pages/404.vue') },
	{ path: '*', redirect: '/404' }
]

const router = new VueRouter({ routes })
const appView = require('./components/app.vue')
const Toast = require('./components/toast.vue')

let ToastClass = Vue.extend(Toast)

new Vue({
	el: '#app',
	render: function (h) {
		return h(appView)
	},
	router,
	data: {
		toasts: [],
		user: {
			accessToken: null,
			refreshToken: null
		}
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
			instance.$root = this;
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
					break;
				}
			}

			for (let i = index; i < this.toasts.length; i++) {
				this.toasts[i].y -= height
			}
		}
	}
})
