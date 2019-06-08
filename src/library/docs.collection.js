export default {
  groups: [ 'everything' ],
  routes: {
    getEndpoints(request) {
      return request.get('doc/')
    }
  },
  actions: {
    getEndpoints({ routes, docs }) {
      return routes.getEndpoints().then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        docs.collect(res.endpoints.map((x, i) => ({ id: i, data: x })), 'everything')
      })
    }
  },
  filters: {
    endpoints({ groups }) {
      return groups.everything.map(x => x.data)
    }
  }
}