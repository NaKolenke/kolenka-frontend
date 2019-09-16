import api from '@/api/notifications'

const state = {
  my: []
}

const getters = {
}

const actions = {
  getAll ({ commit }, { pagination }) {
    return api.getAll(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('storeNotifications', res.notifications)
      return res.notifications
    })
  },
  markAsRead ({ commit }, { ids }) {
    return api.markAsRead(ids).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('markAsRead', ids)
      return res
    })
  },

}

const mutations = {
  storeNotifications (state, data) {
    state.my = data
  },
  markAsRead (state, ids) {
    state.my =
      state.my
        .map(x => {
          if (ids.includes(x)) {
            x.is_new = false
          }
          return x
        })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
