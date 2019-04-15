import api from '@/services/api/content'

export default {
  uploadFile: function (formData) {
    return api
      .uploadFile(formData)
      .then(data => {
        if (data.success === 0) {
          return Promise.reject(new Error(data.error))
        }
        return data
      })
  }
}
