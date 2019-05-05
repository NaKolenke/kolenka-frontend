import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import PostPage from '@/pages/PostPage'
import LoginPage from '@/pages/LoginPage'
import LogoutPage from '@/pages/LogoutPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import ProfileEditPage from '@/pages/ProfileEditPage'
import ProfilesListPage from '@/pages/ProfilesListPage'
import DocPage from '@/pages/DocPage'
import BlogListPage from '@/pages/BlogList'
import AuthErrorPage from '@/pages/401'
import NotFoundPage from '@/pages/404'
import BlogPage from '@/pages/BlogPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/posts/:post',
      name: 'post',
      component: PostPage
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
      name: 'users',
      component: ProfilesListPage
    },
    {
      path: '/users/edit',
      name: 'editProfile',
      component: ProfileEditPage
    },
    {
      path: '/users/:user',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '/blogs/',
      name: 'blogs',
      component: BlogListPage
    },
    {
      path: '/blogs/:name',
      name: 'blog',
      component: BlogPage
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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
