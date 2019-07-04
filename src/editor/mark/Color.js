import { toggleMark } from 'tiptap-commands'
import { Mark }       from 'tiptap'

export default class Color extends Mark {

  get name() {
    return 'color'
  }

  get defaultOptions() {
    return {
      color: null
    }
  }

  get schema() {
    return {
      attrs: {
        color: {
          default: '#3b4351'
        }
      },
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [
        {
          tag: 'span',
          getAttrs: node => ({
            color: node.style.color || '#3b4351'
          })
        }
      ],
      toDOM: node => {
        return ['span', {
          style: `color:${node.attrs.color} !important;`
        }, 0]
      }
    }
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs)
  }
}