import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import RestorePasswordPage from '@/pages/RestorePassword.vue'
import NewPasswordPage from '@/pages/NewPassword.vue'
import UserPage from '@/pages/UserPage.vue'
import UserEditPage from '@/pages/UserEditPage.vue'
import UsersListPage from '@/pages/UsersListPage.vue'
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
