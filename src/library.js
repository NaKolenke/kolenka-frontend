import Pulse from 'pulse-framework'
import PostService from '@/services/post'

const meta = {
  data: {
    user: null
  },
  actions: {
    isLoggedIn() {
      return store.meta.data.user != null
    }
  }
}

const comments = {
  actions: {
    sendComment(context, post, message, parent) {
      context.throttle(1000)
      
      return PostService.postComment(post, message, parent).then(data => {
        if (parent) {
          for (let item of context.getGroup('everything')) {
            let found = context.actions.findParent(item, parent)

            if (found) {
              if (!found.children) found.children = []

              found.children.push(data.comment)
              break
            }
          }
        } else {
          context.collect(data.comment, 'everything')
        }
        
        return data.comment
      })
    },
    findParent(context, comment, parentId) {
      if (comment.id === parentId)
        return comment

      if (comment.children) {
        for (let item of comment.children) {
          let found = context.actions.findParent(item, parentId)

          if (found) return found
        }
      }
    }
  },
  groups: [ 'everything' ]
}

const userBlogs = {
  groups: [ 'everything' ]
}

const posts = {
  groups: [ 'everything' ]
}

const store = new Pulse.Library({
  collections: {
    meta,
    comments,
    userBlogs,
    posts
  }
})

export default store