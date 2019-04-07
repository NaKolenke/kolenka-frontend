import Config from '@/config.json'

export default {
  login: function (username, password) {
    return fetch(Config.apiUrl + '/users/login/', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
  },
  register: function (username, name, email, password) {
    return fetch(Config.apiUrl + '/users/register/', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        email: email,
        name: name,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json()
      })
  },
  getSelf: function () {
    return fetch(Config.apiUrl + '/users/self/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => {
      return res.json()
    })
  },
  getUsers: function (page) {
    return fetch(Config.apiUrl + '/users/?page=' + page, {
      query: {
        'page': page
      },
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => {
      return res.json()
    })
  },
  getUser: function (username) {
    return fetch(Config.apiUrl + '/users/' + username + '/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => {
      return res.json()
    })
  },
  isTokenValid: function (toen) {
    fetch(Config.apiUrl + '/tokens/valid/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        token: localStorage.getItem('accessToken')
      })
    }).then(res => {
      return res.json()
    })
  },
  refreshToken: function (token) {
    fetch(Config.apiUrl + '/tokens/refresh/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    }).then(res => {
      return res.json()
    })
  }
}
