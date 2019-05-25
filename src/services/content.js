import content from './api/content'
import { checkErrors } from './utils'

export default {
  uploadFile(formData) {
    return content
      .uploadFile(formData)
      .then(checkErrors)
  }
}
