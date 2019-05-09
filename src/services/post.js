import posts from './api/post'
import getSlug from 'speakingurl'

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
  postComment(post, text, parent) {
    return posts
      .postComment(post, text, parent)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  createPost(title, text, draft, blogId) {
    return posts
      .createPost(
        title, text, getSlug(title, { lang: 'ru' }), draft, blogId
      )
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
