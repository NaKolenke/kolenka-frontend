import hljs from 'highlight.js/lib/highlight'
import '@/highlight'
import createElement from '@/utils/createelement'
import { throttle } from 'throttle-debounce'
import axios from 'axios'

export function wrapCode(element) {
  let codeTargets = element.querySelectorAll('code')
  codeTargets.forEach(target => {
    hljs.highlightBlock(target)
  })
}

const defaultWidth = '480px'
const defaultHeight = '360px'

function getVideoTitle(id) {
  const apiKey = 'AIzaSyAJObvtrtpzFv0XlrJv4jw53q6LfqRjb80';

  return axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet',
      id,
      key: apiKey
    }
  })
}

const getVideoTitleThrottled = throttle(500, (id, element) => {
  getVideoTitle(id).then(res => {
    const snippet = res.data.items[0].snippet
    element.innerText = snippet.channelTitle + ' | ' + snippet.title
  })
})

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

    let title = createElement('div')
    wrapper.appendChild(title)

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

    getVideoTitleThrottled(id, title)

    let click = e => {
      wrapper.appendChild(target)
      img.style.display = 'none'
      span.style.display = 'none'
      title.style.display = 'none'
    }

    img.addEventListener('click', click)
    span.addEventListener('click', click)
  })
}