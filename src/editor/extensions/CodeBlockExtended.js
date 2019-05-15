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
      console.log(this.editorView.state.doc)
      if (this.editorView.state.selection.empty) {
        insertText('    ')(
          this.editorView.state,
          this.editorView.dispatch,
          this.editorView
        )
      } else {
        // TODO: make it work with not fully selected lines
        
        let result = this.editorView.state.doc.textContent.split('\n').map(x => '    ' + x).join('\n')
        insertText(result)(
          this.editorView.state,
          this.editorView.dispatch,
          this.editorView
        )
      }
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
