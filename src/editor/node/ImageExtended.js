import { Image } from 'tiptap-extensions'
import View from '@/editor/node/ImageView.vue'

export default function ImageExtended() {
  const image = new Image()
  
  Object.defineProperty(image, 'view', {
    get() {
      return View
    }
  })

  let schema = Object.assign({}, image.schema)

  Object.assign(schema.attrs, {
    width: {
      default: null
    },
    height: {
      default: null
    }
  })

  Object.defineProperty(image, 'schema', {
    get() {
      return schema
    }
  })

  return image
}