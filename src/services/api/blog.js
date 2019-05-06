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
  }
}
