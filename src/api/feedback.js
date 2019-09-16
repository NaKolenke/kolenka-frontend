import request from '@/utils/request'

export default {
  getList: () => {
    return request
      .get(`feedback/`)
      .then(res => res.data)
  },
  send: (text) => {
    return request
      .post(`feedback/`,
        {
          text
        })
      .then(res => res.data)
  },
  resolve: (id) => {
    return request
      .get(`feedback/${id}/`)
      .then(res => res.data)
  },
}
