import { Extension } from 'tiptap'
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { insertText } from 'tiptap-commands'

class View {  
  constructor({ editor, view, indentSize }) {
    this.editor = editor
    this.editorView = view
    this.isActive = false
    this.indentSize = indentSize

    this.editorView.dom.addEventListener('focus', this.onFocus.bind(this))
    this.editorView.dom.addEventListener('blur', this.onBlur.bind(this))
    this.editorView.dom.addEventListener('keydown', this.onKeyDown.bind(this))
  }

  onKeyDown(e) {
    if (!this.isActive || !this.editor.isActive.code_block())
      return
    
    if (e.keyCode === 9 && e.shiftKey ) {
      if (this.editorView.state.selection.empty) {
        return
      }

      this.un_indent()
    } else if (e.keyCode === 9) {
      this.indent()
    }
  }

  indent() {
    if (this.editorView.state.selection.empty) {
      let transaction = insertText(' '.repeat(this.indentSize))

      transaction(
        this.editorView.state,
        this.editorView.dispatch
      )
    } else {        
      let lines = this.editorView.state.doc.textContent.substring(
        this.editorView.state.selection.from - 1,
        this.editorView.state.selection.to - 1
      ).split('\n')
      let result = lines.map(x => ' '.repeat(this.indentSize) + x).join('\n')

      let transaction = insertText(result)
      let selection = this.editor.state.selection

      transaction(
        this.editorView.state,
        this.editorView.dispatch
      )

      let newSelection = TextSelection.create(
        this.editorView.state.doc,
        selection.$anchor.pos + this.indentSize * lines.length,
        selection.$head.pos
      )

      this.editorView.dispatch(
        this.editorView.state.tr.setSelection(newSelection)
      )
    }
  }

  un_indent() {
    let symbols = 0
    let result = this.editorView.state.doc.textContent.substring(
      this.editorView.state.selection.from - 1,
      this.editorView.state.selection.to - 1
    ).split('\n').map(x => {
      let match = x.match(/^\s+/)
      
      if (match) {
        let length = match[0].length > this.indentSize ? this.indentSize : match[0].length
        symbols += length
        return x.substring(length)
      } else {
        return x
      }
    }).join('\n')

    let transaction = insertText(result)
    let selection = this.editor.state.selection

    transaction(
      this.editorView.state,
      this.editorView.dispatch
    )

    let newSelection = TextSelection.create(
      this.editorView.state.doc,
      selection.$anchor.pos - symbols,
      selection.$head.pos
    )

    this.editorView.dispatch(
      this.editorView.state.tr.setSelection(newSelection)
    )
  }

  onFocus() {
    this.isActive = true
  }

  onBlur() {
    this.isActive = false
  }
  
  destroy() {
    this.editorView.dom.removeEventListener('focus', this.onFocus)
    this.editorView.dom.removeEventListener('blur', this.onBlur)
    this.editorView.dom.removeEventListener('keydown', this.onKeyDown)
  }
}

export default class CodeBlockExtended extends Extension {
  
  get name() {
    return 'cb_extended'
  }

  get defaultOptions() {
    return {
      indent: 2,
    }
  }

  get plugins() {
    let self = this
    return [
      new Plugin({
        key: new PluginKey('cb_extended'),
        view(editorView) {
          return new View({ editor: self.editor, view: editorView, indentSize: self.options.indent })
        }
      })
    ]
  }
}
