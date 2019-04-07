import api from '@/services/api/auth'

export default {
  login: function (username, password) {
    return api
      .login(username, password)
      .then(data => {
        if (data.success === 1) {
          localStorage.setItem('accessToken', data.access_token.token)
          localStorage.setItem('accessTokenExpireDate', data.access_token.valid_until)
          localStorage.setItem('refreshToken', data.refresh_token.token)
          localStorage.setItem('refreshTokenExpireDate', data.refresh_token.valid_until)
        }
        return data
      })
  },
  register: function (username, name, email, password) {
    return api
      .register(username, name, email, password)
      .then(data => {
        if (data.success === 1) {
          localStorage.setItem('accessToken', data.access_token.token)
          localStorage.setItem('accessTokenExpireDate', data.access_token.valid_until)
          localStorage.setItem('refreshToken', data.refresh_token.token)
          localStorage.setItem('refreshTokenExpireDate', data.refresh_token.valid_until)
        }
        return data
      })
  },
  getSelf: function () {
    return api.getSelf()
  },
  logout: function () {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessTokenExpireDate')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshTokenExpireDate')
  },
  getUsers: function (page) {
    return api.getUsers(page)
  },
  getUser: function (username) {
    return api.getUser(username)
  }
}
