import { Image } from 'tiptap-extensions'
import View from '@/editor/node/ImageView.vue'

export class ImageExtended extends Image {
  get view() {
    return View
  }

  get schema() {
    return {
      inline: true,
      attrs: {
        src: {},
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        width: {
          default: null
        },
        height: {
          default: null
        }
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: dom => ({
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
            width: dom.getAttribute('width'),
            height: dom.getAttribute('height')
          })
        }
      ],
      toDOM: node => ['img', node.attrs]
    }
  }
}