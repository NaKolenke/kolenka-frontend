export default function processStickers (html) {
  let r = html.replace(/:([a-z0-9]*?):/gm, `<img src="${process.env.VUE_APP_API_URL}stickers/$1"/>`)
  return r
}
