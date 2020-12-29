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
  getPostById: (id) => {
    return request
      .get(`posts/by-id/${id}/`)
      .then(res => res.data)
  },
  createPost: (title, text, url, draft, blogId, tags, jamEntries) => {
    return request
      .post(`posts/`,
        {
          blog: blogId,
          cut_name: null,
          is_draft: draft,
          text,
          title,
          url,
          tags,
          jam_entries: jamEntries
        })
      .then(res => res.data)
  },
  editPost: (title, text, url, originalUrl, draft, blogId, tags, jamEntries) => {
    return request
      .put(`posts/${originalUrl}/`,
        {
          blog: blogId,
          cut_name: null,
          is_draft: draft,
          text,
          title,
          url,
          tags,
          jam_entries: jamEntries
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
  deletePost: (url) => {
    return request
      .delete(`posts/${url}/`)
      .then(res => res.data)
  },
  deletePostById: (id) => {
    return request
      .delete(`posts/by-id/${id}/`)
      .then(res => res.data)
  },
}
