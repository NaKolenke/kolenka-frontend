import users from './api/user'
import auth from './auth'
import ContentService from './content'

export default {
  login(username, password) {
    return auth
      .login(username, password)
      .then(data => {
        localStorage.setItem('accessToken', data.access_token.token)
        localStorage.setItem('accessTokenExpireDate', data.access_token.valid_until)
        localStorage.setItem('refreshToken', data.refresh_token.token)
        localStorage.setItem('refreshTokenExpireDate', data.refresh_token.valid_until)

        return data
      })
  },
  register(username, name, email, password) {
    return auth
      .register(username, name, email, password)
      .then(data => {
        localStorage.setItem('accessToken', data.access_token.token)
        localStorage.setItem('accessTokenExpireDate', data.access_token.valid_until)
        localStorage.setItem('refreshToken', data.refresh_token.token)
        localStorage.setItem('refreshTokenExpireDate', data.refresh_token.valid_until)

        return data
      })
  },

  getSelf () {
    return users.getSelf()
  },
  editSelf (user) {
    return users.editSelf(user.email, user.name, user.about, user.birthday)
  },
  editAvatar (formData) {
    return ContentService
      .uploadFile(formData)
      .then(data => {
        return users.editAvatar(data.file.id)
      })
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  logout () {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('accessTokenExpireDate')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshTokenExpireDate')
  },
  getUsers (page) {
    return users
      .getUsers(page)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getUser (username) {
    return users
      .getUser(username)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
