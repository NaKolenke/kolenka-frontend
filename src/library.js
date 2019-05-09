import Pulse from 'pulse-framework'
import PostService from '@/services/post'

let meta = {
  data: {
    user: null
  },
  actions: {
    isLoggedIn() {
      return store.meta.data.user != null
    }
  }
}

let comments = {
  actions: {
    sendComment(context, post, message, parent) {
      return PostService.postComment(post, {
        text: message,
        parent: parent || 0
      }).then(data => {
        if (parent) {
          for (let item of context.everything) {
            let found = context.findParent(item, parent)

            if (found) {
              found.children.push(data.comment)

              break
            }
          }
        }

        context.collect(data.comment, 'everything')
        
        return data.comment
      })
    },
    findParent(context, comment, parentId) {
      if (comment.id === parentId)
        return comment

      if (comment.children) {
        for (let item of comment.children) {
          let found = context.findParent(item, parentId)

          if (found) return found
        }
      }
    }
  },
  groups: [ 'everything' ]
}

const store = new Pulse.Library({
  collections: {
    meta,
    comments
  }
})

export default store