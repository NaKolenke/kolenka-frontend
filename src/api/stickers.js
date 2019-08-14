import { api } from './instance'

export default {
  getAllStickers () {
    return api.get('/stickers/').then(res => res.data)
  },
  
}