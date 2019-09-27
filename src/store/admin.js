import api from '@/api/admin'

const state = {
}

const getters = {
}

const actions = {
  getDashboard (_context) {
    return api.getDashboard().then(res => {
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
