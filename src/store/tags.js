import api from '@/api/tags'

const state = {
  tags: [],
  suggested: {
    items: [],
    isLoading: false
  }
}

const getters = {
}

const actions = {
  getAll ({ commit }) {
    return api.getAll().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }

      commit('storeTags', res.tags)
      return res.tags
    })
  },
  getSuggestions ({ commit }, { tag }) {
    if (tag.length == 0) {
      commit('storeSuggested', [])
    } else {
      commit('startLoadingSuggestions')
      return api.getSuggestions(tag).then(res => {
        commit('stopLoadingSuggestions')

        if (res.success !== 1) {
          return Promise.reject(res.error)
        }

        var firstTag = res.tags.filter(t => t.title == tag)
        if (firstTag.length == 0) {
          var randomId = Math.floor(Math.random() * Math.floor(100000))
          firstTag = { id: -randomId, title: tag }
        } else {
          firstTag = firstTag[0]
        }

        commit('storeSuggested', [firstTag].concat(res.tags.filter(t => t.title != tag)))

      })
    }
  },
}

const mutations = {
  storeTags (state, data) {
    state.tags = data.filter(t => t.title != null && t.title != "")
  },
  startLoadingSuggestions (state) {
    state.suggested.isLoading = true
  },
  stopLoadingSuggestions (state) {
    state.suggested.isLoading = false
  },
  storeSuggested (state, data) {
    state.suggested.items = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
