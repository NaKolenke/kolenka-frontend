import users from './api/user'
import auth from './auth'
import ContentService from './content'
import { checkErrors } from './utils'

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
    return users
      .getSelf()
      .then(checkErrors)
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
      .then(checkErrors)
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
      .then(checkErrors)
  },
  getUser (username) {
    return users
      .getUser(username)
      .then(checkErrors)
  },
  getUserBlogs (username, page) {
    return users
      .getUserBlogs(username, page)
      .then(checkErrors)
  },
  getUserPosts (username, page) {
    return users
      .getUserPosts(username, page)
      .then(checkErrors)
  },
  getUserDrafts (page) {
    return users
      .getUserDrafts(page)
      .then(checkErrors)
  }
}
