import api from '@/api/doc'

const state = {
}

const getters = {
}

const actions = {
  getDoc (_context) {
    return api.getDoc().then(res => {
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
