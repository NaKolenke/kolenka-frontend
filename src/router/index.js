import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage'
import DocPage from '@/pages/DocPage'
import AuthErrorPage from '@/pages/401'
import NotFoundPage from '@/pages/404'
import FeedbackPage from '@/pages/FeedbackPage'
import TagPage from '@/pages/TagPage'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'

import blogs from './blogs'
import posts from './posts'
import users from './users'

Vue.use(Router)

const routes = [
  ...blogs,
  ...posts,
  ...users,
  {
    path: '/',
    name: 'home',
    components: {
      default: HomePage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/tags/:title',
    name: 'tag',
    components: {
      default: TagPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/feedback',
    components: {
      default: FeedbackPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/doc',
    components: {
      default: DocPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/401',
    components: {
      default: AuthErrorPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/404',
    components: {
      default: NotFoundPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

export default new Router({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return { selector: to.hash }
      }

      return { x: 0, y: 0 }
    }
  }
})
