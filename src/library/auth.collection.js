export default {
  data: {
    user: null,
    accessToken: null,
    refreshToken: null
  },
  persist: [ 'accessToken', 'refreshToken' ],
  routes: {
    login(request, username, password) {
      return request.post('users/login/', {
        username,
        password
      })
    },
    register(request, username, email, name, password) {
      return request.post('users/register/', {
        username,
        email,
        name,
        password
      })
    },
    recover(request, email) {
      return request.post('users/recover-password/', {
        email
      })
    },
    setPassword(request, password, token) {
      return request.post('users/new-password/', {
        password,
        token
      })
    },
    isTokenValid(request, token) {
      return request.post('tokens/validate/', {
        token
      }, {
        'Authorization': token
      })
    },
    refreshToken(request, token) {
      return request.post('tokens/refresh/', {
        token
      }, {
        'Authorization': token
      })
    },
    getSelf(request, token) {
      return request.get('users/self/', {
        'Authorization': token
      })
    }
  },
  actions: {
    login({ data, routes, actions }, username, password) {
      return routes
      .login(username, password)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        data.accessToken = res.access_token
        data.refreshToken = res.refresh_token
      })
      .then(() => actions.login())
    },
    register({ routes }, username, email, name, password) {
      return routes.register(username, email, name, password).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }
      })
    },
    recover({ routes }, email) {
      return routes.recover(email).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }
      })
    },
    setPassword({ routes }, password, token) {
      return routes.setPassword(password, token).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }
      })
    },
    logout({ data }) {
      data.accessToken = null
      data.refreshToken = null
    },
    getAccessToken({ data }) {
      return data.accessToken ? data.accessToken.token : null
    }
  }
}
