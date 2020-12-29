import BlogListPage from '@/pages/blogs/BlogListPage'
import BlogPage from '@/pages/blogs/BlogPage'
import CreateBlogPage from '@/pages/blogs/CreateBlogPage'

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
      sidebar: {
        hide: true
      }
    }
  },
  {
    path: '/blogs/:blog/edit',
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
