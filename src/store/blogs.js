import api from '@/api/blogs'

const state = {
  my: []
}

const getters = {
}

const actions = {
  getUserBlogs (_context, { username, pagination }) {
    return api.getUserBlogs(username, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getMyBlogs ({ commit }, { username, pagination }) {
    return api.getUserBlogs(username, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeMyBlogs', res.blogs)
      return res
    })
  },
  getAllBlogs (_context, { pagination }) {
    return api.getAllBlogs(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  joinBlog (_context, { url }) {
    return api.joinBlog(url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getBlog (_context, { url }) {
    return api.getBlog(url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.blog
    })
  },
  getReaders (_context, { url, pagination }) {
    return api.getReaders(url, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  createBlog (_context, { title, description, type, url }) {
    return api.createBlog(title, description, type, url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.blog
    })
  },
  editBlog (_context, { title, description, type, url }) {
    return api.editBlog(title, description, type, url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res.blog
    })
  },
}

const mutations = {
  storeMyBlogs (state, blogs) {
    state.my = blogs
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
