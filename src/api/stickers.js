import { api } from './instance'

export default {
  getAllStickers () {
    return api.get('/stickers/').then(res => res.data)
  },
  addSticker(name, content) {
    return api.post('/stickers/', {
      name: name,
      file: content
    }, {
      headers: {
        'Authorization': JSON.parse(localStorage.getItem('_auth_accessToken')).token
      }
    }).then(res => res.data)
  }
}