import { api, getAccessToken } from './instance'

export default {
  getTags () {
    return api
      .get('/tags/', {})
      .then(res => res.data)
  },
}
