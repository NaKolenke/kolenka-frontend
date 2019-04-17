import Config from '@/config.json'

export default {
  getPosts: function (page) {
    return fetch(Config.apiUrl + '/posts/?page=' + page, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  },
  getPost: function (post) {
    return fetch(Config.apiUrl + '/posts/' + post + '/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  }
}
