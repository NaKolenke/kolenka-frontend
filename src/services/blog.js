import blog from './api/blog'
import { checkErrors } from './utils'

export default {
  getBlogs(page) {
    return blog
      .getBlogs(page)
      .then(checkErrors)
  },
  getBlogPosts(url, page) {
    return blog
      .getBlogPosts(url, page)
      .then(checkErrors)
  },
  joinBlog(url) {
    return blog
      .joinBlog(url)
      .then(checkErrors)
  },
  getReaders(url) {
    return blog
      .getReaders(url)
      .then(checkErrors)
  },
  getBlog(url) {
    return blog
      .getBlog(url)
      .then(checkErrors)
  },
  createBlog(type, title, description, url) {
    return blog
      .createBlog({ type, title, description, url })
      .then(checkErrors)
  },
  editBlog(url, title, description, type) {
    return blog
      .editBlog(url, { title, description, type })
      .then(checkErrors)
  }
}
