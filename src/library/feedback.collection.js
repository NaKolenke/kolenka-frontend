export default {
  routes: {
    resolveItem(request, id, token) {
      return request.get(`feedback/${id}/`, {
        'Authorization': token
      })
    },
    sendFeedback(request, text, token) {
      return request.post('feedback/', {
        text
      }, {
        'Authorization': token
      })
    },
    getList(request, token) {
      return request.get('/feedback/', {
          'Authorization': token
      })
    }
  },
  actions: {
    resolve({ routes, auth }, id) {
      return routes.resolveItem(id, auth.accessToken.token).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
    },
    send({ routes, auth }, text) {
      return routes.sendFeedback(text, auth.accessToken.token).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
    },
    getList({ routes, auth }) {
      routes.getList(auth.accessToken.token).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
    }
  }
}