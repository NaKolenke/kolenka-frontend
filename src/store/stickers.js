import api from '@/api/stickers'

const state = {
  available: [],
}

const getters = {
}

const actions = {
  getAll ({ commit }) {
    return api.getAllStickers().then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('storeAll', res.stickers)
      return res
    })
  },
  add ({ commit }, { name, file_id }) {
    return api.addSticker(name, file_id).then(res => {
      if (res.success !== 1) {
        return Promise.reject(res.error)
      }
      commit('addSticker', res.sticker)
      return res
    })
  },
  processHtml (_context, { html }) {
    let r = html.replace(/:([a-z]*?):/gm, `<img src="${process.env.VUE_APP_API_URL}stickers/$1"/>`)
    console.log(r)
    return r
  }
}

const mutations = {
  storeAll (state, data) {
    state.available = data
  },
  addSticker (state, data) {
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
