import hljs from 'highlight.js/lib/highlight'
import '@/highlight'
import createElement from '@/utils/createelement'

export function wrapCode(element) {
  let codeTargets = element.querySelectorAll('code')
  codeTargets.forEach(target => {
    hljs.highlightBlock(target)
  })
}

const defaultWidth = '300px'
const defaultHeight = '220px'

export function wrapYoutube(element) {
  let youtubeTargets = element.querySelectorAll('iframe')
  youtubeTargets.forEach(target => {
    if (!target.src.match(/embed\/[a-zA-Z0-9_]+/))
      return
    
    let id = target.src.match(/embed\/[a-zA-Z0-9_]+/)[0].substr(6)

    let image = `http://img.youtube.com/vi/${id}/hqdefault.jpg`
    
    let wrapper = createElement('div', {
      classList: [ 'youtube-video' ]
    })
    target.parentNode.insertBefore(wrapper, target)
    wrapper.appendChild(target)
    wrapper.removeChild(target)
    wrapper.style.width = target.width || defaultWidth
    wrapper.style.height = target.height || defaultHeight

    let img = createElement('img', {
      src: image,
      width: target.width || defaultWidth,
      height: target.height || defaultHeight
    })
    wrapper.appendChild(img)
    
    let span = createElement('span', {
      classList: [ 'icon-youtube' ]
    })
    wrapper.appendChild(span)

    let click = e => {
      wrapper.appendChild(target)
      img.style.display = 'none'
      span.style.display = 'none'
    }

    img.addEventListener('click', click)
    span.addEventListener('click', click)
  })
}