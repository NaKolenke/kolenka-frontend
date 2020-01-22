import request from '@/utils/request'

export default {
  vote: (id, type, value) => {
    return request
      .post(`/votes/`,
        {
          'target_id': id,
          'target_type': type,
          'value': value
        })
      .then(res => res.data)
  }
}
