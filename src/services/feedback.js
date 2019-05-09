import api from './api/feedback'

export default {
  send (feedback) {
    return api
      .send(feedback)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getList () {
    return api
      .getList()
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data.feedback.reverse()
      })
  },
  resolve (id) {
    return api
      .resolve(id)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
