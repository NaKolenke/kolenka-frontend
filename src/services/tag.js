import tag from './api/tag'
import { checkErrors } from './utils'

export default {
  getTags() {
    return tag
      .getTags()
      .then(checkErrors)
  },
}
