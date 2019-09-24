import api from '@/api/doc'

const state = {
  endpoints: []
}

const getters = {
}

const actions = {
  getDoc ({ commit }) {
    return api.getDoc().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('storeEndpoints', res.endpoints)
      return res
    })
  },
}

const mutations = {
  storeEndpoints (state, data) {
    state.endpoints = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
