export default {
    data: {
    },
    routes: {
      getDashboard(request, token) {
        return request.get('admin/', {
            'Authorization': token
        })
      }
    },
    actions: {
      getDashboard({ routes, auth }) {
        return routes.getDashboard(auth.accessToken.token).then(res => {
          if (res.success !== 1) {
            return Promise.reject()
          }
          return res
        })
      }
    }
  }