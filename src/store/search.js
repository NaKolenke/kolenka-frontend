import api from '@/api/search'

const state = {
}

const getters = {
}

const actions = {
  findUsers (_context, { username, pagination }) {
    return api.find('user', username, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  findBlogs (_context, { blog, pagination }) {
    return api.find('blog', blog, pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  findPosts (_context, { post, pagination }) {
    return api.find('post', post, pagination.page, pagination.limit).then(res => {
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
