import blog from './api/blog'

export default {
  getBlogs(page) {
    return blog
      .getBlogs(page)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getBlogPosts(url, page) {
    return blog
      .getBlogPosts(url, page)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  joinBlog(url) {
    return blog
      .joinBlog(url)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getReaders(url) {
    return blog
      .getReaders(url)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
