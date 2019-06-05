export default {
  groups: [ 'everything', 'user' ],
  routes: {
    getUserBlogs(request, username, { page, limit }) {
      return request.get(`users/${username}/blogs/?page=${page || 1}&limit=${limit || 20}`)
    }
  },
  actions: {
    getUserBlogs({ blogs, routes }, username, { page, limit }) {
      return routes.getUserBlogs(username, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
        
        blogs.collect(res.blogs, 'user')
        return res.meta.page_count
      })
    }
  }
}