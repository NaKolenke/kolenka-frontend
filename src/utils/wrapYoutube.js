import Vue from 'vue'
import YoutubeWrapperView from '@/components/YoutubeWrapper.vue'
import { replace } from '@/utils/vanilla'

const YoutubeWrapper = Vue.extend(YoutubeWrapperView)

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

/*const getVideoTitleThrottled = throttle(500, (id, element) => {
  getVideoTitle(id).then(res => {
    if (!res.data.items[0])
      return

    const snippet = res.data.items[0].snippet
    element.innerText = snippet.channelTitle + ' | ' + snippet.title
  })
})*/

export default function wrapYoutube(element, component) {
  let youtubeTargets = element.querySelectorAll('iframe')
  youtubeTargets.forEach(target => {
    if (!target.src.match(/embed\/[a-zA-Z0-9_]+/))
      return
    
    let instance = new YoutubeWrapper({
      propsData: {
        url: target.src
      }
    })
    instance.$root = component.$root
    instance.$mount()

    replace(instance.$el, target)

    /*let id = target.src.match(/embed\/[a-zA-Z0-9_]+/)[0].substr(6)
    let image = `http://img.youtube.com/vi/${id}/hqdefault.jpg`
    
    let wrapper = createElement('div', {
      classList: [ 'youtube-video' ]
    })

    let width = target.width || defaultWidth
    let height = target.height || defaultHeight

    wrapper.setAttribute('style', `width:${width}px; height: ${height}px;`)

    target.parentNode.insertBefore(wrapper, target)
    wrapper.appendChild(target)
    wrapper.removeChild(target)

    let title = createElement('div', {
      classList: [ 'title' ]
    })
    wrapper.appendChild(title)

    let img = createElement('img', {
      src: image,
      width,
      height
    })
    wrapper.appendChild(img)
    
    let span = createElement('span', {
      classList: [ 'icon-youtube' ]
    })
    wrapper.appendChild(span)

    getVideoTitleThrottled(id, title)

    let click = () => {
      wrapper.appendChild(target)
      img.style.display = 'none'
      span.style.display = 'none'
      title.style.display = 'none'
    }

    img.addEventListener('click', click)
    span.addEventListener('click', click)*/
  })
}