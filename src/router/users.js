import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import RestorePasswordPage from '@/pages/RestorePassword.vue'
import NewPasswordPage from '@/pages/NewPassword.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import ProfileEditPage from '@/pages/ProfileEditPage.vue'
import ProfilesListPage from '@/pages/ProfilesListPage.vue'
import UserPostsPage from '@/pages/UserPostsPage.vue'

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
    path: '/restore',
    components: {
      default: RestorePasswordPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/recover-pass',
    components: {
      default: NewPasswordPage,
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
    },
    props: {
      sidebar: {
        hide: true
      }
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
