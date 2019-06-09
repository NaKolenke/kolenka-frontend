import Vue from 'vue'
import YoutubeWrapperView from '@/components/YoutubeWrapper.vue'
import { replace } from '@/utils/vanilla'

const YoutubeWrapper = Vue.extend(YoutubeWrapperView)

/*function getVideoTitle(id) {
  const apiKey = 'AIzaSyAJObvtrtpzFv0XlrJv4jw53q6LfqRjb80';

  return axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet',
      id,
      key: apiKey
    }
  })
}*/

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
  })
}