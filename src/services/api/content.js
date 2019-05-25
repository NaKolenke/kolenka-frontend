import { api, getAccessToken } from './instance'

export default {
  uploadFile (formData) {
    return api
      .post('/content/', formData, {
        headers: {
          'Authorization': getAccessToken()
        }
      })
      .then(res => res.data)
  }
}
