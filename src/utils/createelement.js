/**
 * 
 * @param {string} tag 
 * @param {object} options 
 * @returns {HTMLElement}
 */
export default function (tag, options) {
  let element = document.createElement(tag)

  options = options || {}

  for (let opt in options) {
    if (opt === 'classList') {
      options.classList.forEach(i => {
        element.classList.add(i)
      })

      continue
    }

    if (opt == 'style') {
      for (let key in options.style) {
        element.style[key] = options.style[key] // doesn't work????
      }
    }
    
    if (element[opt] != undefined) {
      element.setAttribute(opt, options[opt])
    }
  }

  return element
}