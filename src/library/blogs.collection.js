export default {
  groups: [ 'everything', 'user', 'my' ],
  routes: {
    getUserBlogs(request, username, { page, limit }) {
      return request.get(`users/${username}/blogs/?page=${page || 1}&limit=${limit || 20}`)
    },
    getAll(request, { page, limit }) {
      return request.get(`blogs/?page=${page || 1}&limit=${limit || 20}`)
    },
    joinBlog(request, url, token) {
      return request.post(`blogs/${url}/join/`, {}, {
        'Authorization': token
      })
    },
    getBlog(request, url) {
      return request.get(`blogs/${url}/`)
    },
    getReaders(request, url) {
      return request.get(`blogs/${url}/readers/`)
    },
    createBlog(request) {
      // ...
    },
    editBlog(request) {
      // ...
    }
  },
  actions: {
    getUserBlogs({ blogs, routes }, username, { page, limit }, my) {
      return routes.getUserBlogs(username, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        if (my) {
          blogs.collect(res.blogs, 'my')
        } else {
          blogs.collect(res.blogs, 'user')
        }
        
        return res.meta.page_count
      })
    },
    getAll({ blogs, routes }, { page, limit }) {
      return routes.getAll({ page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        blogs.collect(res.blogs, 'everything')
        return res.meta.page_count
      })
    },
    joinBlog({ routes, auth }, url) {
      return routes.joinBlog(url, auth.accessToken.token).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
      })
    },
    getBlog({ routes }, url) {
      return routes.getBlog(url).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.blog
      })
    },
    getReaders({ routes }, url) {
      return routes.getReaders(url).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.readers
      })
    }
  }
}