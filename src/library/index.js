import Pulse from 'pulse-framework/lib' // Importing source so we can transpile it with babel and get it work in Edge
import comments from './comments.collection'
import posts from './posts.collection'
import blogs from './blogs.collection'
import auth  from './auth.collection'
import users from './users.collection'
import content from './content.collection'
import feedback from './feedback.collection'
import docs from './docs.collection'
import tags from './tags.collection'
import notifications from './notifications.collection'
import search from './search.collection'
import stickers from './stickers.collection'
import admin from './admin.collection'

const store = new Pulse.Library({
  request: {
    baseUrl: process.env.VUE_APP_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  collections: {
    auth,
    users,
    comments,
    blogs,
    posts,
    content,
    feedback,
    docs,
    tags,
    notifications,
    search,
    stickers,
    admin
  }
})

store._global.dataRef.request.baseURL = process.env.VUE_APP_API_URL // Temporary fix

export default store