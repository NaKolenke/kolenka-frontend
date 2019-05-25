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
  },
  createBlog(type, title, description, url) {
    return blog
      .createBlog(type, title, description, url)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  getBlog(url) {
    return blog
      .getBlog(url)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  },
  editBlog(url, title, description, type) {
    return blog
      .editBlog(url, title, description, type)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
