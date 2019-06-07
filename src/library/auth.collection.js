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
      //return new Promise((resolve, reject) => {
        if (data.accessToken != null && data.accessToken != undefined) {
          return routes
          .getSelf(data.accessToken.token)
          .then(res => {
            if (res.success !== 1) {
              //reject()
              return
            }
            
            data.user = res.user
            //resolve()
          })
          .catch(err => {
            console.log(err)
            //reject()
          })
        } else {
          return routes
          .login(username, password)
          .then(res => {
            if (res.success !== 1) {
              //reject()
              return
            }
            
            data.accessToken = res.access_token
            data.refreshToken = res.refresh_token
          })
          .then(() => actions.login())
          .then(() => {
            //resolve()
          })
          .catch(err => {
            console.log(err)
            //reject()
          })
        }
      //})
    },
    register({ routes }, username, email, name, password) {
      return routes.register(username, email, name, password).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }
      })
    },
    logout({ data }) {
      data.accessToken = null
      data.refreshToken = null
    }
  }
}