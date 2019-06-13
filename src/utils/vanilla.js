/**
 * Replace dest with source
 * @param {HTMLElement} source 
 * @param {HTMLElement} dest 
 */
export function replace(source, dest) {
  dest.parentNode.insertBefore(source, dest)
  dest.parentNode.removeChild(dest)
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * @param {string} src 
 * @returns {Promise<{width: number, height: number}>}
 */
export function getImageSize(src) {
  return new Promise((resolve, reject) => {
    var image = new Image()
    image.onload = function() {
      resolve({ width: this.width, height: this.height })
    }
    image.onerror = function() {
      reject()
    }
    image.src = src
  })
}
