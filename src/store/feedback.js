import api from '@/api/feedback'

const state = {
}

const getters = {
}

const actions = {
  getList (_context) {
    return api.getList().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  send (_context, { text }) {
    return api.send(text).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  resolve (_context, { id }) {
    return api.resolve(id).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
