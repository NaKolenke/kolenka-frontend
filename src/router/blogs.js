import BlogListPage from '@/pages/BlogListPage'
import BlogPage from '@/pages/BlogPage'
import CreateBlogPage from '@/pages/CreateBlogPage'

import DefaultSidebar from '@/pages/sidebar/DefaultView.vue'

export default [
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
  }
]