import api from '@/api/tags'

const state = {
  tags: []
}

const getters = {
}

const actions = {
  getAll ({ commit }) {
    return api.getAll().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeTags', res.tags)
      return res.tags
    })
  },
}

const mutations = {
  storeTags (state, data) {
    state.tags = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
