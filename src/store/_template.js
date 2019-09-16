import api from '@/api/_template'

const state = {
  accessToken: null,
}

const getters = {
  accessToken: state => {
    return state.accessToken.token
  }
}

const actions = {
  logout ({ dispatch, commit }) {
    commit('invalidateTokens')
    dispatch('users/invalidateUser')
  },
  register ({ commit }, { username, password, name, email }) {
    return api.register(username, password, name, email).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
}

const mutations = {
  invalidateTokens (state, data) {
    state.accessToken = null
    state.refreshToken = null
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
