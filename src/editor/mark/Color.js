import { toggleMark, updateMark, removeMark } from 'tiptap-commands'
import { Mark } from 'tiptap'

export default class Color extends Mark {

  get name () {
    return 'color'
  }

  get defaultOptions () {
    return {
      color: null
    }
  }

  get schema () {
    return {
      attrs: {
        color: {
          default: 'rgb(59,67,81)'
        }
      },
      inclusive: true,
      draggable: false,
      parseDOM: [
        {
          tag: 'span',
          getAttrs: node => ({
            color: node.style.color
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

  commands ({ type, schema }) {
    return attrs => {
      console.log(attrs)
      if (attrs && attrs.color != 'rgb(59,67,81)') {
        return updateMark(type, { 'color': attrs.color })
      }
      return toggleMark(type)
    }
  }
}
