import api from '@/api/achievements'

const state = {
  available: [],
}

const getters = {
}

const actions = {
  getAll ({ commit }) {
    return api.getAllAchievements().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('storeAll', res.achievements)
      return res
    })
  },
  add ({ commit }, { title, file_id }) {
    return api.addAchievement(title, file_id).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('addAchievement', res.achievement)
      return res
    })
  },
  assign (_, { users, achievement, comment }) {
    return api.assignAchievement(users, achievement, comment).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  unassign (_, { users, achievement }) {
    return api.unassignAchievement(users, achievement).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  }
}

const mutations = {
  storeAll (state, data) {
    state.available = data
    state.available.sort((a, b) => b.id - a.id)
  },
  addAchievement (state, data) {
    state.available.push(data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
