export default {
  routes: {
    getUser(request, username) {
      return request.get(`users/${username}/`)
    },
    editSelf(request, user, token) {
      return request.post('users/self/', user, {
        'Authorization': token
      })
    },
    editAvatar(request, id, token) {
      return request.post('users/self/', {
        avatar: id
      }, {
        'Authorization': token
      })
    }
  },
  actions: {
    getUser({ routes }, username) {
      return routes.getUser(username).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.user
      })
    },
    editSelf({ auth, routes }, user) {
      return routes.editSelf({
        email: user.email,
        name: user.name,
        about: user.about,
        birthday: user.birthday
      }, auth.data.accessToken.token).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return auth.data.user = res.user
      })
    },
    editAvatar({ auth, content, routes }, data) {
      return content
      .uploadFile(data)
      .then(file => routes.editAvatar(file.id, auth.data.accessToken.token))
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return auth.data.user = res.user
      })
    }
  }
}