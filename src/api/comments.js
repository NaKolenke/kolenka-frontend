import request from '@/utils/request'

export default {
  getComments: (url, suburl, type, page, limit) => {
    var requestUrl = null
    if (type === 'post') {
      requestUrl = `posts/${url}/comments/`
    } else if (type === 'jam') {
      requestUrl = `jams/${url}/comments/`
    } else if (type === 'jam-entry') {
      requestUrl = `jams/${url}/entry/${suburl}/comments/`
    }
    return request
      .get(`${requestUrl}?page=${page || 1}&limit=${limit || 20}`)
      .then(res => res.data)
  },
  postComment: (url, suburl, text, parent, type) => {
    var requestUrl = null
    if (type === 'post') {
      requestUrl = `posts/${url}/comments/`
    } else if (type === 'jam') {
      requestUrl = `jams/${url}/comments/`
    } else if (type === 'jam-entry') {
      requestUrl = `jams/${url}/entry/${suburl}/comments/`
    }
    return request
      .post(requestUrl,
        {
          text,
          parent: parent || 0
        })
      .then(res => res.data)
  },
  editComment: (url, suburl, text, id, type) => {
    var requestUrl = null
    if (type === 'post') {
      requestUrl = `posts/${url}/comments/`
    } else if (type === 'jam') {
      requestUrl = `jams/${url}/comments/`
    } else if (type === 'jam-entry') {
      requestUrl = `jams/${url}/entry/${suburl}/comments/`
    }
    return request
      .put(`${requestUrl}${id}/`,
        {
          text
        })
      .then(res => res.data)
  },
}
