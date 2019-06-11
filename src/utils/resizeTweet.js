let index = 0

export default function resizeTweet(element) {
  let targets = element.querySelectorAll('iframe')

  const callback = e => {
    if (e.origin !== 'https://twitframe.com')
      return

    if (e.data.height && e.data.element.match(/^tweet_/)) {

      document.getElementById(e.data.element).style.height = e.data.height + 'px'
    }
  }

  window.addEventListener('message', callback)
  
  targets.forEach(target => {
    let match = decodeURIComponent(target.src).match(/twitframe/)

    if (!match) return

    index++

    target.id = `tweet_${index}`
    target.onload = () => {
      target.contentWindow.postMessage({ element: target.id, query: 'height' }, 'https://twitframe.com')
    }    
  })
}