import NoLoginPage from '@/pages/auth/NoLoginPage.vue'
import LoginPage from '@/pages/auth/LoginPage.vue'
import RegisterPage from '@/pages/auth/RegisterPage.vue'
import RestorePasswordPage from '@/pages/auth/RestorePassword.vue'
import NewPasswordPage from '@/pages/auth/NewPassword.vue'
import UserPage from '@/pages/users/UserPage.vue'
import UserEditPage from '@/pages/users/UserEditPage.vue'
import UsersListPage from '@/pages/users/UsersListPage.vue'
import UserPostsPage from '@/pages/users/UserPostsPage.vue'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'

export default [
  {
    path: '/login',
    components: {
      default: NoLoginPage,
      // default: LoginPage,
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
      default: NoLoginPage,
      // default: RegisterPage,
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
      default: NoLoginPage,
      // default: RestorePasswordPage,
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
      default: NoLoginPage,
      // default: NewPasswordPage,
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
      default: UsersListPage,
      sidebar: DefaultSidebar
    }
  },
  {
    path: '/users/edit',
    name: 'editUser',
    components: {
      default: UserEditPage,
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
    name: 'user',
    components: {
      default: UserPage,
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
