import { Node } from 'tiptap'
import { wrappingInputRule, toggleWrap } from 'tiptap-commands'

import SpoilerComponent from '@/components/editor/node/SpoilerComponent'


export default class Spoiler extends Node {
  get name () {
    return 'spoiler'
  }

  get schema () {
    return {
      attrs: {
        title: {
          default: 'Спойлер'
        }
      },
      group: 'block',
      content: 'block+',
      selectable: true,
      editable: true,
      draggable: false,
      parseDOM: [{
        tag: 'spoiler',
        getAttrs: dom => ({
          title: dom.getAttribute('title'),
        }),
      }],
      toDOM: (node) => (
        ['spoiler', { title: node.attrs.title }, 0]
      ),
    }
  }

  // || test
  inputRules ({ type }) {
    return [
      wrappingInputRule(
        /^\s*\|\|\s?([a-zA-Zа-яА-Я .,!?\-0-9]*)\s?\|\|\s$/,
        type,
        (match) => {
          return { 'title': match[1] || "Спойлер" }
        }),
    ]
  }

  commands ({ type, schema }) {
    return attrs => toggleWrap(type, schema.nodes.paragraph, attrs)
  }

  get view () {
    return SpoilerComponent
  }
}
