import { api, getAccessToken } from './instance'

export default {
  self () {
    return api
      .get('/users/self/', {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  editSelf (email, name, about, birthday) {
    return api
      .post('/users/self/', {
        email,
        name,
        about,
        birthday
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  editAvatar (avatarId) {
    return api
      .post('/users/self/', {
        avatar: avatarId
      }, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  },
  all (page) {
    return api
      .get('/users/', {
        params: {
          page: page || 1
        }
      })
      .then(res => res.data)
  },
  get (username) {
    return api
      .get(`/users/${username}/`)
      .then(res => res.data)
  },
  blogs (username, page) {
    return api
      .get(`/users/${username}/blogs/`, {
        params: {
          page : page || 1
        }
      })
      .then(res => res.data)
  },
  posts (username, page) {
    return api
      .get(`/users/${username}/posts/`, {
        params: {
          page: page || 1
        }
      })
      .then(res => res.data)
  },
  drafts (page) {
    return api
      .get('/users/drafts/', {
        params: {
          page: page || 1
        },
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  }
}
