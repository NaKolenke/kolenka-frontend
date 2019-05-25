import auth from './api/auth'
import { checkErrors } from './utils'

export default {
  login (username, password) {
    return auth
      .login(username, password)
      .then(checkErrors)
  },
  register (username, name, email, password) {
    return auth
      .register(username, name, email, password)
      .then(checkErrors)
  },
  isTokenValid () {
    return auth.isTokenValid()
  },
  refreshToken () {
    return auth.refreshToken()
  }  
}
