import request from '@/utils/request'

export default {
  getDashboard: () => {
    return request
      .get(`admin/`)
      .then(res => res.data)
  },
}
