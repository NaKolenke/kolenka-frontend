export default {
  groups: [ 'everything' ],
  routes: {
    getAll(request, token, { page, limit }) {
      return request.get(`notifications/?page=${page || 1}&limit=${limit || 20}`, {
        'Authorization': token
      })
    },
    markAsRead(request, token, notifications) {
      return request.put(`notifications/`, {
        ids: notifications
      }, {
        'Authorization': token
      })
    }
  },
  actions: {
    getAll({ notifications, routes, auth }, { page, limit }) {
      return routes.getAll(auth.accessToken.token, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        notifications.collect(res.notifications, 'everything')

        return res.meta.page_count
      })
    },
    markAsRead({ notifications, routes, auth }, ids) {
      return routes.markAsRead(auth.accessToken.token, ids).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        ids.map(x => notifications.delete(x))
      })
    }
  }
}