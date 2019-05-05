var apiUrl = process.env.VUE_APP_API_URL

export default {
  getPosts: function (page) {
    return fetch(apiUrl + '/posts/?page=' + page, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  },
  getPost: function (post) {
    return fetch(apiUrl + '/posts/' + post + '/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  },
  getComments: function(post) {
    return fetch(apiUrl + '/posts/' + post + '/comments/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  }
}
