export default {
  routes: {
    getEndpoints(request) {
      return request.get('doc/')
    }
  },
  actions: {
    getEndpoints({ routes }) {
      return routes.getEndpoints().then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.endpoints
      })
    }
  }
}