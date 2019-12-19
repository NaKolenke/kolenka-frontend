import { Node } from 'tiptap'
import { replaceText } from 'tiptap-commands'
import SuggestionsPlugin from 'tiptap-extensions/src/plugins/Suggestions'

export default class Stickers extends Node {
  get name () {
    return 'stickers'
  }

  // https://github.com/scrumpy/tiptap/blob/master/examples/Components/Routes/Suggestions/index.vue

  get defaultOptions () {
    return {
      matcher: {
        char: ':',
        allowSpaces: false,
        startOfLine: false,
      }
    }
  }

  get schema () {
    return {
      attrs: {
        label: {}
      },
      group: 'inline',
      inline: true,
      selectable: false,
      atom: true,
      toDOM: node => [
        'span',
        `${this.options.matcher.char}${node.attrs.label}${this.options.matcher.char}`
      ],
      parseDOM: [
        {
          tag: 'span',
          getAttrs: dom => {
            const label = dom.innerText.split(this.options.matcher.char).join('')
            return { label }
          }
        }
      ]
      // toDOM: node => [
      //   'img',
      //   {
      //     'sticker': node.attrs.label,
      //     src: 'https://beta.kolenka.net/api/stickers/' + node.attrs.label,
      //     class: 'sticker',
      //   }
      //   // `${this.options.matcher.char}${node.attrs.label}${this.options.matcher.char}`
      // ],
      // parseDOM: [
      //   {
      //     tag: "img[sticker]",
      //     getAttrs: dom => {
      //       console.log(dom)
      //       const label = dom.getAttribute('sticker')
      //       // const label = dom.innerText.split(this.options.matcher.char).join('')
      //       return { label }
      //     }
      //   }
      // ]
    }
  }

  commands ({ schema }) {
    return attrs => replaceText(null, schema.nodes[this.name], attrs)
  }

  get plugins () {
    return [
      SuggestionsPlugin({
        command: ({ range, attrs, schema }) => replaceText(range, schema.nodes[this.name], attrs),
        appendText: ' ',
        matcher: this.options.matcher,
        items: this.options.items,
        onEnter: this.options.onEnter,
        onChange: this.options.onChange,
        onExit: this.options.onExit,
        onKeyDown: this.options.onKeyDown,
        onFilter: this.options.onFilter,
        suggestionClass: this.options.suggestionClass
      })
    ]
  }

}
