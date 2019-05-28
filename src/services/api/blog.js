import { api, getAccessToken } from './instance'

export default {
  all (page, limit) {
    return api
      .get('/blogs/', {
        params: {
          page: page || 1,
          limit: limit || null
        }
      })
      .then(res => res.data)
  },
  posts (url, page, limit) {
    return api
      .get(`/blogs/${url}/posts/`, {
        params: {
          page: page || 1,
          limit: limit || null
        }
      })
      .then(res => res.data)
  },
  join (url) {
    return api
      .post(`/blogs/${url}/join/`, {}, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  readers (url) {
    return api
      .get(`/blogs/${url}/readers/`)
      .then(res => res.data)
  },
  create ({ type, title, description, url }) {
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
  get (url) {
    return api
      .get(`/blogs/${url}/`)
      .then(res => res.data)
  },
  edit (url, { title, description, type }) {
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
