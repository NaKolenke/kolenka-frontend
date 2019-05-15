import { Extension } from 'tiptap'
import { Plugin, PluginKey  } from 'prosemirror-state'
import { insertText } from 'tiptap-commands'

class View {  
  constructor({ editor, view }) {
    this.editor = editor
    this.editorView = view
    this.isActive = false

    this.editorView.dom.addEventListener('focus', this.onFocus.bind(this))
    this.editorView.dom.addEventListener('blur', this.onBlur.bind(this))
    this.editorView.dom.addEventListener('keydown', this.onKeyDown.bind(this))
  }

  onKeyDown(e) {
    if (e.keyCode === 9 && this.isActive && this.editor.isActive.code_block()) {
      let transaction = null

      if (this.editorView.state.selection.empty) {
        transaction = insertText('    ')
      } else {        
        let result = this.editorView.state.doc.textContent.substring(
          this.editorView.state.selection.from - 1,
          this.editorView.state.selection.to
        ).split('\n').map(x => '    ' + x).join('\n')
        transaction = insertText(result)
      }

      transaction(
        this.editorView.state,
        this.editorView.dispatch,
        this.editorView
      )

    }
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

  get plugins() {
    let self = this
    return [
      new Plugin({
        key: new PluginKey('cb_extended'),
        view(editorView) {
          return new View({ editor: self.editor, view: editorView })
        }
      })
    ]
  }
}
