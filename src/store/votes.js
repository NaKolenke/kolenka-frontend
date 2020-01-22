import api from '@/api/votes'

const state = {
}

const getters = {
}

const actions = {
  vote (_context, { id, type, value }) {
    return api.vote(id, type, value).then(res => {
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
