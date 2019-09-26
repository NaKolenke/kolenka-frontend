import request from '@/utils/request'

export default {
  find: (type, query, page, limit) => {
    return request
      .get(`search/?type=${type}&q=${encodeURIComponent(query)}&page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
}
