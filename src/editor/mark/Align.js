import { toggleMark } from 'tiptap-commands'
import { Mark }       from 'tiptap'

export default class Alignment extends Mark {

  get name() {
    return 'alignment'
  }

  get defaultOptions() {
    return {
      textAlign: ['left', 'center', 'right', 'justify'],
    }
  }

  get schema() {
    return {
      attrs: {
        textAlign: {
          default: 'left'
        }
      },
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [
        {
          tag: 'div',
          getAttrs: node => ({
            textAlign: node.style.textAlign || 'left'
          })
        }
      ],
      toDOM: node => {
        return ['div', {
          style: `text-align:${node.attrs.textAlign};`
        }, 0]
      }
    }
  }

  commands({ type }) {
    return attrs => toggleMark(type, attrs)
  }
}