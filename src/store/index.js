import { BucketStore } from '@romgerman/bucket-store'
import auth from './auth'

const store = new BucketStore('store', {
  auth
})

export default store