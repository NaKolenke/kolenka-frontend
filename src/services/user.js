import api from '@/services/api/auth'
import ContentService from '@/services/content'

export default {
  login: function (username, password) {
    return api
      .login(username, password)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
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
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
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
    return api
      .getSelf()
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  },
  editSelf: function (user) {
    return api
      .editSelf(user.email, user.name, user.about, user.birthday)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  },
  editAvatar: function (formData) {
    return ContentService
      .uploadFile(formData)
      .then(data => {
        return api.editAvatar(data.file.id)
      })
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  },
  logout: function () {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessTokenExpireDate')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshTokenExpireDate')
  },
  getUsers: function (page) {
    return api
      .getUsers(page)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  },
  getUser: function (username) {
    return api
      .getUser(username)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  }
}
