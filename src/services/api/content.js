import Config from '@/config.json'

export default {
  uploadFile: function (formData) {
    return fetch(Config.apiUrl + '/content/', {
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
