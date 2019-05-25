import api from './api/feedback'
import { checkErrors } from './utils'

export default {
  send (feedback) {
    return api
      .send(feedback)
      .then(checkErrors)
  },
  getList () {
    return api
      .getList()
      .then(checkErrors)
  },
  resolve (id) {
    return api
      .resolve(id)
      .then(checkErrors)
  }
}
