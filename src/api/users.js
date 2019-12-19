import request from '@/utils/request'

export default {
  getAll: (page, limit) => {
    return request
      .get(`/users/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getUser: (username) => {
    return request
      .get(`users/${username}/`)
      .then(res => res.data)
  },
  getSelf: () => {
    return request
      .get('users/self/')
      .then(res => res.data)
  },
  editSelf: ({ name, email, about, birthday }) => {
    return request
      .post(`users/self/`, { name, email, about, birthday })
      .then(res => res.data)
  },
  editAvatar: (id) => {
    return request
      .post(`users/self/`, { avatar: id })
      .then(res => res.data)
  },
}
