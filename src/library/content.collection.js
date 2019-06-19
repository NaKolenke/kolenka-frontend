export default {
  groups: [ 'my' ],
  data: {
    pages: [],
    pageCount: 0
  },
  routes: {
    getOwned(request, token, { page, limit }) {
      return request.get(`content/owned/?page=${page || 1}&limit=${limit || 20}`, {
        'Authorization': token
      })
    }
  },
  actions: {
    getUrlById(context, id) {
      return `https://beta.kolenka.net/content/${id}/`
    },
    uploadFile({ auth }, data) {
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
    },
    getOwned({ content, data, routes, auth }, { page, limit }) {
      if (data.pages.includes(page)) { // Check if we already loaded the page
        return Promise.resolve(data.pageCount)
      }
      
      return routes.getOwned(auth.accessToken.token, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        content.collect(res.files, 'my')
        data.pages.push(page)

        return data.pageCount = res.meta.page_count
      })
    }
  }
}