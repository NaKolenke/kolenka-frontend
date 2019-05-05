var apiUrl = process.env.VUE_APP_API_URL

export default {
  uploadFile: function (formData) {
    return fetch(apiUrl + '/content/', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('accessToken')
      }
    })
      .then(res => {
        return res.json()
      })
  }
}
