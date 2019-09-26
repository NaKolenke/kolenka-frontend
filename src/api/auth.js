import request from '@/utils/request'

export default {
  login: (username, password) => {
    return request
      .post('users/login/', { username, password })
      .then(res => res.data)
  },
  register: (username, password, name, email) => {
    return request
      .post('users/register/', { username, password, name, email })
      .then(res => res.data)
  },
  recover: email => {
    return request
      .post('users/recover-password/', { email })
      .then(res => res.data)
  },
  setPassword: (password, token) => {
    return request
      .post('users/new-password/', { password, token })
      .then(res => res.data)
  },
  isTokenValid: payload => {
    return request
      .post('token/validate/', payload)
      .then(res => res.data)
  },
  refreshToken: token => {
    return request
      .post('token/refresh/', { token })
      .then(res => res.data)
  },
}
