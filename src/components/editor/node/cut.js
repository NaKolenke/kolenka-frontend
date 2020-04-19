import { Node } from 'tiptap'
import { textblockTypeInputRule } from 'tiptap-commands'

export default class Cut extends Node {
  get name () {
    return 'cut'
  }

  get schema () {
    return {
      attrs: {
        name: {
          default: null
        }
      },
      content: 'text*',
      group: 'block',
      selectable: true,
      editable: true,
      draggable: true,
      toDOM: (node) => (
        ['cut', { name: node.attrs.name }]
      ),
      parseDOM: [{
        tag: 'cut',
        getAttrs: dom => ({
          name: dom.getAttribute('name'),
        }),
      }],
    }
  }

  // ------
  inputRules ({ type }) {
    return [
      textblockTypeInputRule(
        /^--\s?([a-zA-Zа-яА-Я .,!?\-0-9]*)\s?--$/,
        type,
        (match) => {
          return {
            'name': match[1] || "Читать дальше"
          }
        }),
    ]
  }

  commands ({ type }) {
    return attrs => (state, dispatch) => {
      const { selection } = state
      const position = selection.$cursor ? selection.$cursor.pos : selection.$to.pos
      const node = type.create(attrs)
      const transaction = state.tr.insert(position, node)
      dispatch(transaction)
    }
  }

  get view () {
    return {
      props: ['node', 'updateAttrs', 'view'],
      computed: {
        name: {
          get () {
            return this.node.attrs.name
          },
          set (name) {
            // we cannot update `src` itself because `this.node.attrs` is immutable
            this.updateAttrs({
              name,
            })
          },
        },
      },
      template: `<span style="border: 1px solid black; padding: 6px; line-height: 2rem;">Кат: {{name}}</span>`,
    }
  }

}
