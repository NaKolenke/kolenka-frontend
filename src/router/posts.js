import PostPage from '@/pages/PostPage'
import WritePostPage from '@/pages/WritePostPage'
import UserDraftsPage from '@/pages/DraftsPage'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'
import PostPageSidebar from '@/pages/sidebar/PostView.vue'

export default [
  {
    path: '/new/post',
    name: 'new-post',
    components: {
      default: WritePostPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/edit/post',
    name: 'edit-post',
    components: {
      default: WritePostPage,
      sidebar: DefaultSidebar
    },
    props: {
      sidebar: {
        hide: true
      }
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
    path: '/drafts',
    name: 'userDrafts',
    components: {
      default: UserDraftsPage,
      sidebar: DefaultSidebar
    }
  }
]
