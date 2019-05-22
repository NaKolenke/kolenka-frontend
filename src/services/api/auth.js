import { api } from './instance'

export default {
  login (username, password) {
    return api.post('/users/login/', {
      username,
      password
    }).then(res => res.data)
  },
  register (username, name, email, password) {
    return api.post('/users/register/', {
      username,
      email,
      name,
      password
    }).then(res => res.data)
  },
  isTokenValid () {
    return api.post('/tokens/validate/', {
      token: localStorage.getItem('accessToken')
    }, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  refreshToken () {
    return api.post('/tokens/refresh/', {
      token: localStorage.getItem('accessToken')
    }, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  }  
}
