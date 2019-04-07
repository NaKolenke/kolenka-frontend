import Config from '@/config.json'

export default {
  getEndpoints: function () {
    return fetch(Config.apiUrl + '/doc/', {
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
