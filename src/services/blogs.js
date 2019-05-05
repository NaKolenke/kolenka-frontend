var apiUrl = process.env.VUE_APP_API_URL

export default {
  getBlogs: function (page) {
    return fetch(apiUrl + '/blogs/?page=' + page, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  },
  getBlogPosts: function(url, page) {
    return fetch(apiUrl + `/blogs/${url}/posts/?page=` + (page || 1), {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  }
}
