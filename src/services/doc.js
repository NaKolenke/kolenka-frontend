var apiUrl = process.env.VUE_APP_API_URL

export default {
  getEndpoints: function () {
    return fetch(apiUrl + '/doc/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
  }
}
