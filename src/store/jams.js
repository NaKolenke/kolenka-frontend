import api from '@/api/jams'
import Pagination from '@/models/pagination'

const state = {
  current: null,
  currentEntry: null,
  posts: null,
  entries: null
}

const getters = {
}

const mutations = {
  setCurrent (state, data) {
    state.current = data
  },
  setCurrentPosts (state, posts) {
    state.posts = posts
  },
  setCurrentEntries (state, entries) {
    state.entries = entries
  },
  setCurrentEntry (state, data) {
    state.currentEntry = data
  },
  enterJam (state) {
    state.current.is_participiating = true
    state.current.participators += 1
  },
  leaveJam (state) {
    state.current.is_participiating = false
    state.current.participators -= 1
  },
  startJam (state) {
    state.current.status = 1
  },
  finishJam (state) {
    state.current.status = 2
  }
}

const actions = {
  getAllJams (_context, { pagination }) {
    return api.getAllJams(pagination.page, pagination.limit).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      return res
    })
  },
  getJam ({ commit, dispatch }, { url }) {
    return api.getJam(url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('setCurrent', res.jam)

      return dispatch('jams/getJamPosts', { jam: res.jam }, { root: true })
    })
  },
  getJamPosts ({ commit, dispatch }, { jam }) {
    return dispatch('posts/getBlogPosts', { url: jam.blog.url, pagination: new Pagination(1, 50) }, { root: true })
      .then(res => {
        commit('setCurrentPosts', res.posts)
        return jam
      })
  },
  createJam (_context, { title, description, shortDescription, url, startDate, endDate, criterias, logo }) {
    return api.createJam(title, description, shortDescription, url, startDate, endDate, criterias, logo)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
        return res.jam
      })
  },
  editJam (_context, { title, description, shortDescription, url, startDate, endDate, criterias, logo }) {
    return api.editJam(title, description, shortDescription, url, startDate, endDate, criterias, logo)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
        return res.jam
      })
  },
  enterJam ({ commit }, { url }) {
    return api.enterJam(url)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        commit('enterJam')

        return res
      })
  },
  leaveJam ({ commit }, { url }) {
    return api.leaveJam(url)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        commit('leaveJam')

        return res
      })
  },
  startJam ({ commit }, { url }) {
    return api.startJam(url)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        commit('startJam')

        return res
      })
  },
  finishJam ({ commit }, { url }) {
    return api.finishJam(url)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        commit('finishJam')

        return res
      })
  },
  getJamEntries ({ commit }, { url }) {
    return api.getJamEntries(url).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('setCurrentEntries', res.entries)

      return res.entries
    })
  },
  getMyEntry ({ commit }, { jamUrl }) {
    return api.getMyEntry(jamUrl)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
        commit('setCurrentEntry', res.entry)

        return res.entry
      })
  },
  editJamEntry (_context, { title, info, shortInfo, url, logo, links, jamUrl }) {
    return api.editJamEntry(title, info, shortInfo, url, logo, links, jamUrl)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
        return res.jam
      })
  },
  getEntry ({ commit }, { jamUrl, entryUrl }) {
    return api.getEntry(jamUrl, entryUrl)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }
        commit('setCurrentEntry', res.entry)

        return res.entry
      })
  },
  getEntryCriterias (_context, { jamUrl, entryUrl }) {
    return api.getEntryCriterias(jamUrl, entryUrl)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res.criterias
      })
  },
  addEntryVotes (_context, { jamUrl, entryUrl, criterias }) {
    return api.addEntryVotes(jamUrl, entryUrl, criterias)
      .then(res => {
        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        return res
      })
  },
  resetCurrentEntry ({ commit }) {
    commit('setCurrentEntry', null)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
