import { api } from './instance'

export default {
  getPosts(page) {
    return api.get('/posts/', {
      params: {
        page: page || 1
      },
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  getPost(post) {
    return api.get(`/posts/${post}/`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  getComments(post, page) {
    return api.get(`/posts/${post}/comments/`, {
      params: {
        page: page || 1
      },
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  }
}
