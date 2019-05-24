import { api } from './instance'

export default {
  getSelf() {
    return api
      .get('/users/self/', {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  },
  editSelf(email, name, about, birthday) {
    return api
      .post('/users/self/', {
        email,
        name,
        about,
        birthday
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken')
        }
      })
      .then(res => res.data)
  },
  editAvatar(avatarId) {
    return api
      .post('/users/self/', {
        avatar: avatarId
      }, {
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        }
      })
      .then(res => res.data)
  },
  getUsers(page) {
    return api
      .get('/users/', {
        params: {
          page: page || 1
        }
      })
      .then(res => res.data)
  },
  getUser(username) {
    return api
      .get(`/users/${username}/`)
      .then(res => res.data)
  },
  getUserBlogs(username, page) {
    return api
      .get(`/users/${username}/blogs/`, {
        params: {
          page : page || 1
        }
      })
      .then(res => res.data)
  },
  getUserPosts(username, page) {
    return api
      .get(`/users/${username}/posts/`, {
        params: {
          page: page || 1
        }
      })
      .then(res => res.data)
  },
  getUserDrafts(page) {
    return api
      .get('/users/drafts/', {
        params: {
          page: page || 1
        },
        headers: {
          'Authorization': localStorage.getItem('accessToken'),
        }
      })
      .then(res => res.data)
  }
}
