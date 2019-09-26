import api from '@/api/posts'

const state = {
  my: [],
  current: null
}

const getters = {
}

const actions = {
  getAll (_context, { pagination }) {
    return api.getAll(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getPost ({ commit }, { url }) {
    return api.getPost(url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('setCurrent', res.post)
      return res.post
    })
  },
  createPost (_context, { title, text, url, draft, blogId }) {
    return api.createPost(title, text, url, draft, blogId).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.post
    })
  },
  editPost (_context, { title, text, url, draft, blogId }) {
    return api.editPost(title, text, url, draft, blogId).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.post
    })
  },
  getPostsByTag (_context, { tag, pagination }) {
    return api.getPostsByTag(tag, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getBlogPosts (_context, { url, pagination }) {
    return api.getBlogPosts(url, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getUserDrafts (_context, { pagination }) {
    return api.getUserDrafts(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getUserPosts (_context, { username, pagination }) {
    return api.getUserPosts(username, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      return res
    })
  },
}

const mutations = {
  storeMyPosts (state, data) {
    state.my = data
  },
  setCurrent (state, data) {
    state.current = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
