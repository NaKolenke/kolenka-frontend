import blog from './api/blog'
import { checkErrors } from './utils'

export default {
  getBlogs(page) {
    return blog
      .all(page)
      .then(checkErrors)
  },
  getBlogPosts(url, page) {
    return blog
      .posts(url, page)
      .then(checkErrors)
  },
  joinBlog(url) {
    return blog
      .join(url)
      .then(checkErrors)
  },
  getReaders(url) {
    return blog
      .readers(url)
      .then(checkErrors)
  },
  getBlog(url) {
    return blog
      .get(url)
      .then(checkErrors)
  },
  createBlog(type, title, description, url) {
    return blog
      .create({ type, title, description, url })
      .then(checkErrors)
  },
  editBlog(url, title, description, type) {
    return blog
      .edit(url, { title, description, type })
      .then(checkErrors)
  }
}
