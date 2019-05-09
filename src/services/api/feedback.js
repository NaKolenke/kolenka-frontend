import { api } from './instance'

export default {
  send (feedback) {
    return api.post('/feedback/',
      {
        text: feedback
      },
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  },
  getList () {
    return api.get('/feedback/',
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  },
  resolve (id) {
    return api.get('/feedback/' + id + '/',
      {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  }
}
