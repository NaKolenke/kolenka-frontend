import auth from './api/auth'

export default {
  login (username, password) {
    return auth
      .login(username, password)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  register (username, name, email, password) {
    return auth
      .register(username, name, email, password)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  isTokenValid () {
    return auth.isTokenValid()
  },
  refreshToken () {
    return auth.refreshToken()
  }  
}
