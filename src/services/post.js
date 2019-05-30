import posts from './api/post'
import getSlug from 'speakingurl'
import { checkErrors } from './utils'

export default {
  getPosts (page) {
    return posts
      .getPosts(page)
      .then(checkErrors)
  },
  getPost (post) {
    return posts
      .getPost(post)
      .then(checkErrors)
  },
  getComments(post, page) {
    return posts
      .getComments(post, page)
      .then(checkErrors)
  },
  postComment(post, text, parent) {
    return posts
      .postComment(post, text, parent)
      .then(checkErrors)
  },
  createPost(title, text, draft, blogId) {
    return posts
      .createPost(
        title, text, getSlug(title, { lang: 'ru' }), draft, blogId
      )
      .then(checkErrors)
  },
  editPost(url, title, text, draft, blogId) {
    return posts
      .editPost(
        url, { title, text, draft, blogId }
      )
      .then(checkErrors)
  },
  getPostsByTag (tag, page) {
    return posts
      .getPostsByTag(tag, page)
      .then(checkErrors)
  },
}
