export default {
  groups: [ 'everything' ],
  routes: {
    getAll(request) {
      return request.get('tags/')
    }
  },
  actions: {
    getAll({ routes, tags }) {
      return routes.getAll().then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        tags.collect(res.tags.filter(x => x.title.length > 0), 'everything')
      })
    }
  }
}