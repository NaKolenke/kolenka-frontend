import request from '@/utils/request'

export default {
  getOwned: (page, limit) => {
    return request
      .get(`content/owned/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  uploadFile: (file) => {
    return request
      .post(`content/`, file)
      .then(res => res.data)
  },
}
