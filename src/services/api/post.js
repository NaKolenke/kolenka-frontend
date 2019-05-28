import { api, getAccessToken } from './instance'

export default {
  all (page) {
    return api
      .get('/posts/', {
        params: {
          page: page || 1
        },
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  get (post) {
    return api
      .get(`/posts/${post}/`, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  comments (post, page) {
    return api
      .get(`/posts/${post}/comments/`, {
        params: {
          page: page || 1
        },
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  postComment (post, text, parent) {
    return api
      .post(`/posts/${post}/comments/`, {
        text,
        parent: parent || 0
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  create (title, text, url, draft, blogId) {
    return api
      .post('/posts/', {
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
      .then(res => res.data)
  },
  edit (url, { title, text, draft, blogId }) {
    return api
      .put(`/posts/${url}/`, {
        blog: blogId,
        is_draft: draft || false,
        text,
        title
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  }
}
