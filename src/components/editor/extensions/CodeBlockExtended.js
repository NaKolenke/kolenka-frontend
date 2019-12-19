import { Extension } from 'tiptap'
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { insertText } from 'tiptap-commands'

function indent(view, size) {
  if (view.state.selection.empty) {
    let transaction = insertText(' '.repeat(size))

    transaction(
      view.state,
      view.dispatch
    )
  } else {        
    let lines = view.state.doc.textContent.substring(
      view.state.selection.from - 1,
      view.state.selection.to - 1
    ).split('\n')
    let result = lines.map(x => ' '.repeat(size) + x).join('\n')

    let transaction = insertText(result)
    let selection = view.state.selection

    transaction(
      view.state,
      view.dispatch
    )

    let newSelection = TextSelection.create(
      view.state.doc,
      selection.$anchor.pos + size * lines.length,
      selection.$head.pos
    )

    view.dispatch(
      view.state.tr.setSelection(newSelection)
    )
  }
}

function un_indent(view, size) {
  let symbols = 0
  let result = view.state.doc.textContent.substring(
    view.state.selection.from - 1,
    view.state.selection.to - 1
  ).split('\n').map(x => {      
    let match = x.match(/^\s+/)
    
    if (match) {
      let length = match[0].length > size ? size : match[0].length
      symbols += length
      return x.substring(length)
    } else {
      return x
    }
  }).join('\n')

  let transaction = insertText(result)
  let selection = view.state.selection

  transaction(
    view.state,
    view.dispatch
  )

  let newSelection = TextSelection.create(
    view.state.doc,
    selection.$anchor.pos - symbols,
    selection.$head.pos
  )

  view.dispatch(
    view.state.tr.setSelection(newSelection)
  )
}

export default class CodeBlockExtended extends Extension {
  
  get name() {
    return 'cb_extended'
  }

  get defaultOptions() {
    return {
      indent: 2
    }
  }

  get plugins() {
    let self = this
    return [
      new Plugin({
        key: new PluginKey(self.name),
        props: {
          handleKeyDown(view, e) {
            if (!self.editor.isActive.code_block())
              return            

            if (e.keyCode === 9 && e.shiftKey ) {
              if (view.state.selection.empty) {
                return
              }
        
              un_indent(view, self.options.indent)
            } else if (e.keyCode === 9) {
              indent(view, self.options.indent)
            }
          }
        }
      })
    ]
  }
}
