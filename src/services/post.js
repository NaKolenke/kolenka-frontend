import api from '@/services/api/post'

export default {
  getPosts: function (page) {
    return api
      .getPosts(page)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  },
  getPost: function (name) {
    return api
      .getPost(name)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  },
  getComments: function(post) {
    return api
      .getComments(post)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  }
}
