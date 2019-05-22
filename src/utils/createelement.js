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
    
    if (element[opt] != undefined) {
      element.setAttribute(opt, options[opt])
    }
  }

  return element
}