import request from '@/utils/request'

export default {
  getComments: (url, page, limit) => {
    return request
      .get(`posts/${url}/comments/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  postComment: (url, text, parent) => {
    return request
      .post(`posts/${url}/comments/`,
        {
          text,
          parent: parent || 0
        })
      .then(res => res.data)
  },
  editComment: (url, text, id) => {
    return request
      .put(`posts/${url}/comments/${id}`,
        {
          text
        })
      .then(res => res.data)
  },
}
