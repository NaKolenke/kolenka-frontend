import request from '@/utils/request'

export default {
  getDoc: () => {
    return request
      .get(`doc/`)
      .then(res => res.data)
  },
}
