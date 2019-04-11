import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import LoginPage from '@/pages/LoginPage'
import LogoutPage from '@/pages/LogoutPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import ProfilesListPage from '@/pages/ProfilesListPage'
import DocPage from '@/pages/DocPage'
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
      component: LoginPage
    },
    {
      path: '/logout',
      component: LogoutPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/users/',
      component: ProfilesListPage
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
