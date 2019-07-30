export default {
  groups: [ 'everything', 'home', 'temp', 'drafts', 'my', 'tag' ],
  data: {
    pages: 0,
    current: null
  },
  routes: {
    getAll (request, { page, limit }) {
      return request.get(`posts/?page=${page || 1}&limit=${limit || 20}`)
    },
    getPost (request, url, token) { 
      return request.get(`posts/${url}/`, {
        'Authorization': token
      })
    },
    createPost (request, title, text, url, draft, blogId, token) {
      return request.post('posts/', {
        blog: blogId,
        cut_name: null,
        is_draft: draft,
        text,
        title,
        url
      }, {
        'Authorization': token
      })
    },
    editPost (request, url, title, text, draft, blogId, token) {
      return request.put(`posts/${url}/`, {
        blog: blogId,
        is_draft: draft,
        text,
        title
      }, {
        'Authorization': token
      })
    },
    getPostsByTag (request, tag, { page, limit }) {
      return request.get(`tags/${tag}/?page=${page || 1}&limit=${limit || 20}`)
    },
    getBlogPosts(request, url, { page, limit }) {
      return request.get(`blogs/${url}/posts/?page=${page || 1}&limit=${limit || 20}`)
    },
    getUserDrafts(request, token, { page, limit }) {
      return request.get(`users/drafts/?page=${page || 1}&limit=${limit || 20}`, {
        'Authorization': token
      })
    },
    getUserPosts(request, username, { page, limit }) {
      return request.get(`/users/${username}/posts/?page=${page || 1}&limit=${limit || 20}`)
    }
  },
  actions: {
    getPosts({ posts, routes, data }, page) {
      return routes.getAll({ page }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        posts.collect(res.posts, [ 'everything', 'home' ])
        
        return data.pages = res.meta.page_count
      }).catch(err => {
        console.log(err)
      })
    },
    getHomePage({ actions, groups, data }, page) {
      if (groups.home.length > 0) {
        return Promise.resolve(data.pages)
      } else {
        return actions.getPosts(page)
      }
    },
    getPostByUrl({ posts, routes, data, auth }, url) {
      let post = posts.everything.filter(x => x.url === url)[0]

      if (post) {
        data.current = post
        return Promise.resolve(post)
      } else {
        return routes.getPost(url, auth.getAccessToken()).then(res => {
          data.current = res.post
          posts.collect(res.post, 'everything')
          return res.post
        }).catch(err => {
          console.log(err)
        })
      }
    },
    getBlogPosts({ routes }, url, { page, limit }) {      
      return routes.getBlogPosts(url, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        return {
          pages: res.meta.page_count,
          data: res.posts
        }
      })
    },
    createPost({ routes, auth, posts }, title, text, url, draft, blogId) {
      return routes.createPost(title, text, url, draft, blogId, auth.getAccessToken()).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        posts.collect(res.post, [ 'everything', 'home' ])

        return res.post
      })
    },
    editPost({ routes, auth }, url, title, text, draft, blogId) {
      return routes.editPost(url, title, text, draft, blogId, auth.getAccessToken()).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        return res.post
      })
    },
    getUserDrafts({ routes, auth, posts }, page) {
      return routes.getUserDrafts(auth.getAccessToken(), { page }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        posts.collect(res.posts, 'drafts')

        return res.meta.page_count
      })
    },
    getUserPosts({ routes, posts }, username, page) {
      return routes.getUserPosts(username, { page }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        posts.collect(res.posts, 'my')

        return res.meta.page_count
      })
    },
    getOtherUserPosts({ routes }, username, limit, page) {
      return routes.getUserPosts(username, { page, limit }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        return res.posts
      })
    },
    getPostsByTag({ routes, posts }, tag, page) {
      return routes.getPostsByTag(tag, { page }).then(res => {
        if (res.success !== 1) {
          return Promise.reject()
        }

        posts.collect(res.posts, 'tag')
        return res
      })
    }
  }
}