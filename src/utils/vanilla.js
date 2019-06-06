export function replace(source, dest) {
  dest.parentNode.insertBefore(source, dest)
  dest.parentNode.removeChild(dest)
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}