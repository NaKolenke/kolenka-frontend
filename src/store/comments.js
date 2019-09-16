import api from '@/api/comments'

const state = {
}

const getters = {
}

const actions = {
  getComments (_context, { url, pagination }) {
    return api.getComments(url, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.comments
    })
  },
  postComments (_context, { url, text, parent }) {
    return api.postComment(url, text, parent).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.comment
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
