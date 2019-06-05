export default {
  routes: {
    uploadFile(request, data, token) {      
      /*return request.post('content/', data, {
        'Authorization': token
      })*/
    }
  },
  actions: {
    uploadFile({ routes, auth }, data) {
      return fetch(process.env.VUE_APP_API_URL + '/content/', {
        method: 'POST',
        body: data,
        headers: {
          'Authorization': auth.data.accessToken.token
        }
      })
      .then(res => res.json())
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.file
      })
      /*return routes.uploadFile(data, auth.data.accessToken.token).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.file
      })*/
    }
  }
}