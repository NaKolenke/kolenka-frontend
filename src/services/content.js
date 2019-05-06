import content from './api/content'

export default {
  uploadFile(formData) {
    return content
      .uploadFile(formData)
      .then(data => {
        if (data.success === 0) {
          throw new Error(data.error)
        }

        return data
      })
  }
}
