import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '@/pages/HomePage.vue'
import DocPage from '@/pages/DocPage.vue'
import AuthErrorPage from '@/pages/401.vue'
import NotFoundPage from '@/pages/404.vue'
import FeedbackPage from '@/pages/FeedbackPage.vue'
import TagPage from '@/pages/TagPage.vue'
import NotificationsPage from '@/pages/NotificationsPage.vue'
import SearchPage from '@/pages/SearchPage.vue'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'
import DocsSidebar from '@/pages/sidebar/DocsView.vue'

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
    path: '/notifications',
    name: 'notifications',
    components: {
      default: NotificationsPage,
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
      sidebar: DocsSidebar
    },
    props: {
      sidebar: {
        sticky: true
      }
    }
  },
  {
    path: '/search',
    name: 'search',
    components: {
      default: SearchPage,
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
