import { api } from './instance'

export default {
  getBlogs(page) {
    return api.get('/blogs/', {
      params: {
        page: page || 1
      }
    }).then(res => res.data)
  },
  getBlogPosts(url, page) {
    return api.get(`/blogs/${url}/posts/`, {
      params: {
        page: page || 1
      }
    }).then(res => res.data)
  },
  joinBlog(url) {
    return api.post(`/blogs/${url}/join/`, {}, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  getReaders(url) {
    return api
      .get(`/blogs/${url}/readers/`)
      .then(res => res.data)
  }
}
