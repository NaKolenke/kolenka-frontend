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
        
        filterTransaction(tr, { doc }) {
          
          if (tr.steps.length) {
            const { size } = tr.steps[0].slice.content
            if (doc.textContent.length + size > limit) {
              if (tr.steps[0].slice.content.size > 0) {
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