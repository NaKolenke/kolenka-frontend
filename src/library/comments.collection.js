export default {
  groups: [ 'everything' ],
  routes: {
    getComments (request, url, { page, limit }) { 
      return request.get(`posts/${url}/comments/?page=${page || 1}&limit=${limit || 20}`)
    },
    postComment (request, url, text, parent, token) {
      return request.post(`posts/${url}/comments/`, {
        text,
        parent: parent || 0
      }, {
        'Authorization': token
      })
    }
  },
  actions: {
    getComments({ comments, routes }, postUrl) {
      return routes.getComments(postUrl, {}).then(res => {
        
        res.comments.forEach(item => {
          if (item.parent) {
            let parent = res.comments.find(x => x.id === item.parent.id)
            if (!parent.children)
              parent.children = []

            parent.children = [ ...parent.children, item.id ]
          }
        })

        comments.collect(res.comments.reverse(), 'everything')

        return res.comments.length
      })
    },
    sendComment({ throttle, routes, auth, groups, actions, comments }, post, message, parent) {
      throttle(1000)

      return routes.postComment(post, message, parent, auth.getAccessToken()).then(res => {
        if (parent) {
          for (let item of groups.everything) {
            let found = actions.findParent(item, parent)

            if (found) {
              if (!found.children)
                found.children = []

              found.children = [ ...found.children, res.comment.id ]

              break
            }
          }
        }
        
        comments.collect(res.comment, 'everything')
        
        return res.comment
      })
    },
    findParent(context, comment, parentId) {
      if (comment.id === parentId)
        return comment

      if (comment.children) {
        for (let item of comment.children) {
          let found = context.actions.findParent(item, parentId)

          if (found)
            return found
        }
      }
    }
  },
  filters: {
    root({ groups }) {
      return groups.everything.filter(x => x.parent == null)
    }
  }
}