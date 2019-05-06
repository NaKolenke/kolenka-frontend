import { api } from './instance'

export default {
  getSelf() {
    return api.get('/users/self/', {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  editSelf(email, name, about, birthday) {
    return api.post('/users/self/', {
      email,
      name,
      about,
      birthday
    }, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  editAvatar(avatarId) {
    return api.post('/users/self/', {
      avatar: avatarId
    }, {
      headers: {
        'Authorization': localStorage.getItem('accessToken'),
      }
    }).then(res => res.data)
  },
  getUsers(page) {
    return api.get('/users/', {
      params: {
        page: page || 1
      },
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  },
  getUser(username) {
    return api.get(`/users/${username}/`, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  }
}
