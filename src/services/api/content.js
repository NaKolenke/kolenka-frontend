import { api } from './instance'

export default {
  uploadFile(formData) {
    return api.post('/content/', formData, {
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }).then(res => res.data)
  }
}
