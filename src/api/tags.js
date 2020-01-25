import request from '@/utils/request'

export default {
  getAll: () => {
    return request
      .get(`tags/`)
      .then(res => res.data)
  },
  getSuggestions: (tag) => {
    return request
      .post(`tags/suggestion/`, {
        title: tag
      })
      .then(res => res.data)
  },
}
