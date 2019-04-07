import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import ProfilePage from '@/pages/profile'
import DocPage from '@/pages/doc'
import AuthErrorPage from '@/pages/401'
import NotFoundPage from '@/pages/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      component: LoginPage,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/register',
      component: RegisterPage,
      meta: {
        requiresUnAuth: true
      }
    },
    {
      path: '/users/:user',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/doc',
      component: DocPage
    },
    {
      path: '/401',
      component: AuthErrorPage
    },
    {
      path: '/404',
      component: NotFoundPage
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
