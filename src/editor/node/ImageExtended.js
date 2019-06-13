import { Image } from 'tiptap-extensions'
import View from '@/editor/node/ImageView.vue'

export default function ImageExtended() {
  const image = new Image()
  
  Object.defineProperty(image, 'view', {
    get() {
      return View
    }
  })

  return image
}