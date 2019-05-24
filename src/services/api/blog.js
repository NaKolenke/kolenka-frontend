import { api } from './instance'

export default {
  getBlogs(page) {
    return api
      .get('/blogs/', {
        params: {
          page: page || 1
        }
      })
      .then(res => res.data)
  },
  getBlogPosts(url, page) {
    return api
      .get(`/blogs/${url}/posts/`, {
        params: {
          page: page || 1
        }
      })
      .then(res => res.data)
  },
  joinBlog(url) {
    return api
      .post(`/blogs/${url}/join/`, {}, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  },
  getReaders(url) {
    return api
      .get(`/blogs/${url}/readers/`)
      .then(res => res.data)
  },
  createBlog(type, title, description, url) {
    return api
      .post('/blogs/', {
        blog_type: type,
        description,
        image: null,
        title,
        url
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  },
  getBlog(url) {
    return api
      .get(`/blogs/${url}/`)
      .then(res => res.data)
  },
  editBlog(url, title, description) {
    return api
      .put(`/blogs/${url}/`, {
        title,
        description
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  }
}
