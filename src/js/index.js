'use strict'

import '../css/styles.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Moment from 'moment'
import 'moment/locale/ru'

import appView from './components/app.vue'
import Toast  from './components/toast.vue'
import cookie from 'js-cookie'
import config from './config.json'

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
		user: null
	},
	mounted: function () {
		let data = cookie.getJSON('tokens')

		if (data)
			this.login(data)
	},
	methods: {
		showToast: function (msg) {
			let y = this.toasts.map(i => {
				return i.$el.offsetHeight
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
		login: function (data) {

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
	} else {
		next()
	}
})
