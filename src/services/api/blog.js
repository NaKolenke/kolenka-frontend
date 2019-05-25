import { api, getAccessToken } from './instance'

export default {
  getBlogs (page, limit) {
    return api
      .get('/blogs/', {
        params: {
          page: page || 1,
          limit: limit || null
        }
      })
      .then(res => res.data)
  },
  getBlogPosts (url, page, limit) {
    return api
      .get(`/blogs/${url}/posts/`, {
        params: {
          page: page || 1,
          limit: limit || null
        }
      })
      .then(res => res.data)
  },
  joinBlog (url) {
    return api
      .post(`/blogs/${url}/join/`, {}, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  getReaders (url) {
    return api
      .get(`/blogs/${url}/readers/`)
      .then(res => res.data)
  },
  createBlog ({ type, title, description, url }) {
    return api
      .post('/blogs/', {
        blog_type: type,
        description,
        image: null,
        title,
        url
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  getBlog (url) {
    return api
      .get(`/blogs/${url}/`)
      .then(res => res.data)
  },
  editBlog (url, { title, description, type }) {
    return api
      .put(`/blogs/${url}/`, {
        title,
        description,
        blog_type: type
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  }
}
