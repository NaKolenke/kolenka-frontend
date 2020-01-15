import request from '@/utils/request'

export default {
  getAll: (page, limit) => {
    return request
      .get(`posts/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getPost: (url) => {
    return request
      .get(`posts/${url}/`)
      .then(res => res.data)
  },
  createPost: (title, text, url, draft, blogId) => {
    return request
      .post(`posts/`,
        {
          blog: blogId,
          cut_name: null,
          is_draft: draft,
          text,
          title,
          url
        })
      .then(res => res.data)
  },
  editPost: (title, text, url, originalUrl, draft, blogId) => {
    return request
      .put(`posts/${originalUrl}/`,
        {
          blog: blogId,
          cut_name: null,
          is_draft: draft,
          text,
          title,
          url
        })
      .then(res => res.data)
  },
  getPostsByTag: (tag, page, limit) => {
    return request
      .get(`tags/${tag}/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getBlogPosts: (url, page, limit) => {
    return request
      .get(`blogs/${url}/posts/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getUserDrafts: (page, limit) => {
    return request
      .get(`users/drafts/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  getUserPosts: (username, page, limit) => {
    return request
      .get(`/users/${username}/posts/?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
}
