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
  }
}
