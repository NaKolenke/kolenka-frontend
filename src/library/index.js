import Pulse from 'pulse-framework'
import comments from './comments.collection'
import posts from './posts.collection'
import blogs from './blogs.collection'
import auth  from './auth.collection'
import users from './users.collection'
import content from './content.collection'

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
    content
  }
})

store._global.dataRef.request.baseURL = process.env.VUE_APP_API_URL // Temporary fix

export default store