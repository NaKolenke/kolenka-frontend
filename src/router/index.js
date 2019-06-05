import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import PostPage from '@/pages/PostPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import ProfileEditPage from '@/pages/ProfileEditPage'
import ProfilesListPage from '@/pages/ProfilesListPage'
import DocPage from '@/pages/DocPage'
import BlogListPage from '@/pages/BlogListPage'
import AuthErrorPage from '@/pages/401'
import NotFoundPage from '@/pages/404'
import BlogPage from '@/pages/BlogPage'
import WritePostPage from '@/pages/WritePostPage'
import FeedbackPage from '@/pages/FeedbackPage'
import UserPostsPage from '@/pages/UserPostsPage'
import CreateBlogPage from '@/pages/CreateBlogPage'
import UserDraftsPage from '@/pages/DraftsPage'
import TagPage from '@/pages/TagPage'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'
import PostPageSidebar from '@/pages/sidebar/PostView.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: HomePage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/new/post',
    name: 'new-post',
    components: {
      default: WritePostPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: true
    }
  },
  {
    path: '/new/blog',
    name: 'new-blog',
    components: {
      default: CreateBlogPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: true
    }
  },
  {
    path: '/edit/blog',
    name: 'edit-blog',
    components: {
      default: CreateBlogPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/edit/post',
    name: 'edit-post',
    components: {
      default: WritePostPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/posts/:post',
    name: 'post',
    components: {
      default: PostPage,
      sidebar: PostPageSidebar
    }
  },
  {
    path: '/login',
    components: {
      default: LoginPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: true
    }
  },
  {
    path: '/register',
    components: {
      default: RegisterPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: true
    }
  },
  {
    path: '/users/',
    name: 'users',
    components: {
      default: ProfilesListPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/users/edit',
    name: 'editProfile',
    components: {
      default: ProfileEditPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: true
    }
  },
  {
    path: '/users/:user',
    name: 'profile',
    components: {
      default: ProfilePage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/users/:user/posts',
    name: 'userPosts',
    components: {
      default: UserPostsPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/drafts',
    name: 'userDrafts',
    components: {
      default: UserDraftsPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/blogs/',
    name: 'blogs',
    components: {
      default: BlogListPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/blogs/:name',
    name: 'blog',
    components: {
      default: BlogPage,
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
