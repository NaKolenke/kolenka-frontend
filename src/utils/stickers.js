export default function processStickers (html) {
  let r = html.replace(/:([a-z]*?):/gm, `<img src="${process.env.VUE_APP_API_URL}stickers/$1"/>`)
  return r
}
