import api from '@/api/comments'

const state = {
  current_comments: []
}

const getters = {
  byId: (state) => (id) => {
    return state.current_comments.find(c => c.id == id)
  },
  hasChilds: (state) => (parentId) => {
    return !!(state.current_comments.find(c => c.parent != null && c.parent.id == parentId))
  },
  getChilds: (state) => (parentId) => {
    return state.current_comments.filter(c => c.parent != null && c.parent.id == parentId)
  },
  comments: (state) => {
    return state.current_comments
  },
  topLevelComments: (state) => {
    return state.current_comments.filter(c => c.parent == null)
  },
  commentsCount: (state) => {
    return state.current_comments.length
  },
}

const actions = {
  getComments ({ commit }, { url, pagination }) {
    return api.getComments(url, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeCurrentComments', res.comments)
      return res.comments
    })
  },
  postComment ({ commit }, { url, text, parent }) {
    return api.postComment(url, text, parent).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('addComment', res.comment)
      return res.comment
    })
  },
  editComment ({ commit }, { url, text, id }) {
    return api.editComment(url, text, id).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('editComment', res.comment)
      return res.comment
    })
  },
}

const mutations = {
  storeCurrentComments (state, comments) {
    state.current_comments = comments
  },
  addComment (state, comment) {
    state.current_comments = [comment].concat(state.current_comments)
  },
  editComment (state, comment) {
    state.current_comments = state.current_comments.map(c => {
      if (c.id == comment.id) {
        return comment
      }
      return c
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
