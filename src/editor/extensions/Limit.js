import { Extension, Plugin } from "tiptap";

// https://codesandbox.io/s/3204l3on1q

export default class Limit extends Extension {
  
  get name() {
    return "limit"
  }

  get defaultOptions() {
    return {
      limit: 0
    }
  }

  get plugins() {
    const { limit } = this.options;
    return [
      new Plugin({
        
        filterTransaction(tr, { doc, selection }) {
          
          if (tr.steps.length) {
            const { size } = tr.steps[0].slice.content
            if (doc.textContent.length + size > limit) {
              if (tr.steps[0].slice.content.size > 0) {

                if (tr.steps[0].slice.content.firstChild.type.name === 'hard_break') { // Shift/Ctrl+Return
                  return false
                }
                
                if (tr.steps[0].slice.content.firstChild.textContent.length === 0) { // When we want to remove content (Backspace)
                  return true
                }

                if (!selection.empty &&
                    tr.steps[0].slice.content.size <= selection.to - selection.from) { // When we select something and want to paste text
                  return true
                }

                return false
              }
            }
          }

          return true
        }
        
      })
    ]
  }
}