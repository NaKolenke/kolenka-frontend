import Vue from 'vue'
import Vuex from 'vuex'
import admin from './admin'
import auth from './auth'
import blogs from './blogs'
import comments from './comments'
import content from './content'
import doc from './doc'
import feedback from './feedback'
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
  modules: {
    admin,
    auth,
    blogs,
    comments,
    content,
    doc,
    feedback,
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
