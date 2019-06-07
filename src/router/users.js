import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import ProfilePage from '@/pages/ProfilePage'
import ProfileEditPage from '@/pages/ProfileEditPage'
import ProfilesListPage from '@/pages/ProfilesListPage'
import UserPostsPage from '@/pages/UserPostsPage'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'

export default [
  {
    path: '/login',
    components: {
      default: LoginPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/register',
    components: {
      default: RegisterPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: {
        hide: true
      }
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
      sidebar: {
        hide: true
      }
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
  }
]