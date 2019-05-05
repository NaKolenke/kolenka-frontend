var apiUrl = process.env.VUE_APP_API_URL

export default {
  login: function (username, password) {
    return fetch(apiUrl + '/users/login/', {
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
    return fetch(apiUrl + '/users/register/', {
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
    return fetch(apiUrl + '/users/self/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => {
      return res.json()
    })
  },
  editSelf: function (email, name, about, birthday) {
    return fetch(apiUrl + '/users/self/', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        name: name,
        about: about,
        birthday: birthday
      }),
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  },
  editAvatar: function (avatarId) {
    return fetch(apiUrl + '/users/self/', {
      method: 'POST',
      body: JSON.stringify({
        avatar: avatarId
      }),
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json()
    })
  },
  getUsers: function (page) {
    return fetch(apiUrl + '/users/?page=' + page, {
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
    return fetch(apiUrl + '/users/' + username + '/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => {
      return res.json()
    })
  },
  isTokenValid: function () {
    fetch(apiUrl + '/tokens/valid/', {
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
  refreshToken: function () {
    fetch(apiUrl + '/tokens/refresh/', {
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
