/** @jsx h */
import { Node } from 'tiptap'
import { textblockTypeInputRule } from 'tiptap-commands'
import * as _ from 'lodash'

function hFlatten (obj) {
  const out = _.merge(obj, (obj || {}).attrs)
  delete out.attrs
  return out
}

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
      textblockTypeInputRule(/^---([a-zA-Zа-яА-Я .,!?\-0-9]*)---$/, type, (match) => { return { 'name': match[1] } }),
    ]
  }

  $createElement (name, attrs, children) {
    return [
      name,
      hFlatten(attrs)
    ].concat(children).filter(x => !_.isNil(x))
  }

  get view () {
    return {
      // there are some props available
      // `node` is a Prosemirror Node Object
      // `updateAttrs` is a function to update attributes defined in `schema`
      // `view` is the ProseMirror view instance
      // `options` is an array of your extension options
      // `selected`
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
      template: `<cut style="border: 1px solid black; padding: 6px;">Кат: {{name}}</cut>`,
    }
  }

}
