import api from '@/api/users'

const state = {
  me: null
}

const getters = {
}

const actions = {
  getSelf ({ commit }) {
    return api.getSelf().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeSelf', res.user)

      return res.user
    })
  },
  getAll (_context, { pagination }) {
    return api.getAll(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      return res
    })
  },
  getUser (_context, { username }) {
    return api.getUser(username).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      return res.user
    })
  },
  editSelf (_context, { user }) {
    return api.editSelf(user).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      return res.user
    })
  },
  editAvatar (_context, { file }) {
    return api.editAvatar(file.id).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      return res.user
    })
  },
  invalidateUser ({ commit }) {
    commit('invalidateSelf')
  },
}

const mutations = {
  storeSelf (state, user) {
    state.me = user
  },
  invalidateSelf (state) {
    state.me = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
