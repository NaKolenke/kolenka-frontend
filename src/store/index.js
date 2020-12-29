import Vue from 'vue'
import Vuex from 'vuex'
import achievements from './achievements'
import admin from './admin'
import auth from './auth'
import blogs from './blogs'
import comments from './comments'
import content from './content'
import doc from './doc'
import feedback from './feedback'
import jams from './jams'
import notifications from './notifications'
import posts from './posts'
import search from './search'
import stickers from './stickers'
import tags from './tags'
import users from './users'
import votes from './votes'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    isLoading: false,
  },
  mutations: {
    startLoading (state) {
      state.isLoading = true
    },
    stopLoading (state) {
      state.isLoading = false
    },
  },
  actions: {
    startLoading ({ commit }) {
      commit('startLoading')
    },
    stopLoading ({ commit }) {
      commit('stopLoading')
    },
  },
  modules: {
    achievements,
    admin,
    auth,
    blogs,
    comments,
    content,
    doc,
    feedback,
    jams,
    notifications,
    posts,
    search,
    stickers,
    tags,
    users,
    votes,
  },
  strict: debug,
})
