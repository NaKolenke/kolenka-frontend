import { getAccessToken } from '@/library/utils'

export default {
  groups: [ 'everything', 'home', 'temp' ],
  data: {
    pages: 0
  },
  routes: {
    getAll (request, { page, limit }) {
      return request.get(`/posts/?page=${page || 1}&limit=${limit || 20}`)
    },
    getPost (request, url) { 
      return request.get(`/posts/${url}/`)
    },
    postPost (request, title, text, url, draft, blogId) {
      return request.post('/posts/', {
        blog: blogId,
        cut_name: null,
        is_draft: draft || false,
        text,
        title,
        url
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
    },
    editPost (request, url, title, text, draft, blogId) {
      return request.put(`/posts/${url}/`, {
        blog: blogId,
        is_draft: draft || false,
        text,
        title
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
    },
    getPostsByTag (request, tag, { page, limit }) {
      return request.get(`/tags/${tag}/?page=${page || 1}&limit=${limit || 20}`)
    },
    getBlogPosts(request, url, { page, limit }) {
      return request.get(`/blogs/${url}/posts/?page=${page || 1}&limit=${limit || 20}`)
    }
  },
  actions: {
    getPosts({ posts, routes, data }, page) {
      return routes.getAll({ page }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        posts.collect(res.posts, [ 'everything', 'home' ])
        
        return data.pages = res.meta.page_count
      }).catch(err => {
        console.log(err)
      })
    },
    getHomePage({ actions, groups, data }, page) {
      if (groups.home.length > 0) {
        return Promise.resolve(data.pages)
      } else {
        return actions.getPosts(page)
      }
    },
    getPostByUrl({ posts, routes }, url) {
      let post = posts.everything.filter(x => x.url === url)[0]

      if (post) {
        return Promise.resolve(post)
      } else {
        return routes.getPost(url).then(res => {
          posts.collect(res.post, 'everything')
          return res.post
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getBlogPosts({ routes }, url, { page, limit }) {      
      return routes.getBlogPosts(url, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        return {
          pages: res.meta.page_count,
          data: res.posts
        }
      })
    },
    postPosts({ routes }, title, text, url, draft, blogId) {
      return routes.postPost(title, text, url, draft, blogId).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        return res.post
      })
    },
    editPost({ routes }, url, title, text, draft, blogId) {
      return routes.editPost(url, title, text, draft, blogId).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        return res.post
      })
    }
  }
}