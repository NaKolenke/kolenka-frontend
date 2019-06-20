export default {
  routes: {
    find(request, type, query, { page, limit }) {
      return request.get(`search/?type=${type}&q=${encodeURIComponent(query)}&page=${page || 1}&limit=${limit || 20}`)
    }
  },
  actions: {
    findUsers({ routes }, query, { page, limit }) {
      return routes.find('user', query, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
    },
    findBlogs({ routes }, query, { page, limit }) {
      return routes.find('blog', query, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
    },
    findPosts({ routes }, query, { page, limit }) {
      return routes.find('post', query, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
    }
  }
}