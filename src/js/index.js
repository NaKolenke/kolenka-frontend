'use strict'

import '../css/styles.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Moment from 'moment'
import 'moment/locale/ru'

import appView from './components/app.vue'
import Toast from './components/toast.vue'
import config from './config.json'
import api from './services/api/auth'

import homePage from './pages/home.vue'
import loginPage from './pages/login.vue'
import registerPage from './pages/register.vue'
import postPage from './pages/post.vue'
import docPage from './pages/doc.vue'
import notFoundPage from './pages/404.vue'


Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: homePage
	},
	{
		path: '/login',
		component: loginPage,
		meta: {
			requiresUnAuth: true
		}
	},
	{
		path: '/register',
		component: registerPage,
		meta: {
			requiresUnAuth: true
		}
	},
	{
		path: '/posts/:post',
		component: postPage
	},
	{
		path: '/doc',
		component: docPage
	},
	{
		path: '/404',
		component: notFoundPage
	},
	{
		path: '/logout',
		meta: {
			logout: true
		}
	},
	{
		path: '*',
		redirect: '/404'
	}
]

const router = new VueRouter({
	mode: 'history',
	routes: routes
})

let ToastClass = Vue.extend(Toast)

Moment.locale('ru');
Vue.filter('moment', function (timestamp) {
	return Moment.unix(timestamp).format('LLL');
})

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
		notifications: [],
		user: null
	},
	mounted: function () {
		let data = localStorage.getItem('accessToken')

		if (data) {
			this.refreshUser()
		}
	},
	methods: {
		showToast: function (msg) {
			let y = this.toasts.map(i => {
				return i.$el.offsetHeight + 8 // todo remove this hardcoded margin height
			}).reduce((a, b) => a + b, 0)

			let instance = new ToastClass({
				propsData: {
					y: y
				}
			})

			instance.$slots.default = [msg]
			instance.$root = this
			instance.$mount()

			this.$el.appendChild(instance.$el)
			this.toasts.push(instance)

			setTimeout(() => {
				this.hideToast(instance);
			}, 3000)
		},
		hideToast: function (t) {
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
		refreshUser: function () {
			api.getSelf()
				.then(res => {
					if (res.success == 1) {
						this.user = res.user
					} else {
						app.user = null
						localStorage.removeItem('accessToken')
						localStorage.removeItem('refreshToken')
					}
				}).catch(err => {
					app.user = null
					localStorage.removeItem('accessToken')
					localStorage.removeItem('refreshToken')
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
			localStorage.removeItem('accessToken')
			localStorage.removeItem('refreshToken')
			return next({
				path: '/'
			})
		}
		next()
	} else {
		next()
	}
})
