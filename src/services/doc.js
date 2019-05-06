import { api } from './api/instance'

export default {
  getEndpoints() {
    return api.get('/doc/').then(res => res.data)
  }
}