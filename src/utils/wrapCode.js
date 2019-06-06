import hljs from 'highlight.js/lib/highlight'
import '@/highlight'

export default function wrapCode(element) {
  let codeTargets = element.querySelectorAll('pre code')
  codeTargets.forEach(target => {
    hljs.highlightBlock(target)
  })
}