import request from '@/utils/request'

export default {
  getAll: (page, limit) => {
    return request
      .get(`notifications/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  markAsRead: (ids) => {
    return request
      .put(`notifications/`,
        {
          ids
        })
      .then(res => res.data)
  },
  test: () => {
    return request
      .get(`notifications/test`)
      .then(res => res.data)
  }
}
