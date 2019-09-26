import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import blogs from './blogs'
import comments from './comments'
import content from './content'
import doc from './doc'
import feedback from './feedback'
import notifications from './notifications'
import posts from './posts'
import search from './search'
import tags from './tags'
import users from './users'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    auth,
    blogs,
    comments,
    content,
    doc,
    feedback,
    notifications,
    posts,
    search,
    tags,
    users,
  },
  strict: debug,
})
