import posts from './api/post'

export default {
  getPosts (page) {
    return posts
      .getPosts(page)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getPost (post) {
    return posts
      .getPost(post)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getComments(post, page) {
    return posts
      .getComments(post, page)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  postComment(post, text) {
    return posts
      .postComment(post, text)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
