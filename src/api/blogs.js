import request from '@/utils/request'

export default {
  getUserBlogs: (username, page, limit) => {
    return request
      .get(`users/${username}/blogs/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getAllBlogs: (page, limit) => {
    return request
      .get(`blogs/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  joinBlog: url => {
    return request
      .post(`blogs/${url}/join/`)
      .then(res => res.data)
  },
  getBlog: url => {
    return request
      .get(`blogs/${url}/`)
      .then(res => res.data)
  },
  getReaders: url => {
    return request
      .get(`blogs/${url}/readers/`)
      .then(res => res.data)
  },
  createBlog: (title, description, type, url) => {
    return request
      .post(`blogs/`,
        {
          blog_type: type,
          description,
          image: null,
          title,
          url
        })
      .then(res => res.data)
  },
  editBlog: (title, description, type, url, originalUrl) => {
    return request
      .put(`blogs/${originalUrl}/`,
        {
          blog_type: type,
          description,
          title,
          url,
        })
      .then(res => res.data)
  },
}
