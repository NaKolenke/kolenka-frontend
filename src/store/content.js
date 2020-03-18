var _ = require('lodash');
import api from '@/api/content'

const state = {
  my: []
}

const getters = {
}

const actions = {
  getUrlById (_context, { id }) {
    return `${process.env.VUE_APP_CONTENT_URL}/${id}/`
  },
  uploadFile (_context, { file }) {
    return api.uploadFile(file).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.file
    })
  },
  getOwned ({ commit }, { pagination }) {
    // var start = (pagination.page - 1) * pagination.limit
    // var end = pagination.page * pagination.limit
    // if (state.my.length > start) {
    //   return _.slice(state.my, start, end)
    // }

    return api.getOwned(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('addMyContent', res.files)

      return res
    })
  }
}

const mutations = {
  addMyContent (state, data) {
    state.my = state.my.concat(data)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
