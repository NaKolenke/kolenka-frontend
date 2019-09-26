import request from '@/utils/request'

export default {
  getAll: () => {
    return request
      .get(`tags/`)
      .then(res => res.data)
  },
}
