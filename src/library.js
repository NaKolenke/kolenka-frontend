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
      return PostService.postComment(post, message, parent).then(data => {
        if (parent) {
          for (let item of context.getGroup('everything')) {
            let found = context.actions.findParent(item, parent)

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
          let found = context.actions.findParent(item, parentId)

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