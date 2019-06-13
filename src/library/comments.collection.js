export default {
  groups: [ 'everything' ],
  routes: {
    getComments (request, url, { page, limit }) { 
      return request.get(`/posts/${url}/comments/?page=${page || 1}&limit=${limit || 20}`)
    },
    postComment (request, url, text, parent, token) {
      return request.post(`/posts/${url}/comments/`, {
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

            parent.children = [ ...parent.children, item ]
          }
        })

        comments.collect(res.comments.filter(x => x.parent === null).reverse(), 'everything')

        return res.comments.length
      })
    },
    sendComment(context, post, message, parent) {
      context.throttle(1000)

      return context.routes.postComment(post, message, parent, context.auth.accessToken.token).then(res => {
        if (parent) {
          for (let item of context.getGroup('everything')) {
            let found = context.actions.findParent(item, parent)

            if (found) {
              if (!found.children)
                found.children = []

              found.children = [ ...found.children, res.comment ]
              break
            }
          }
        } else {
          context.collect(res.comment, 'everything')
        }

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
  }
}