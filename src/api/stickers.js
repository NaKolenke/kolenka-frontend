import request from '@/utils/request'

export default {
  getAllStickers: () => {
    return request
      .get('/stickers/')
      .then(res => res.data)
  },
  addSticker: (name, content) => {
    return request
      .post('/stickers/', { name: name, file: content })
      .then(res => res.data)
  }
}
