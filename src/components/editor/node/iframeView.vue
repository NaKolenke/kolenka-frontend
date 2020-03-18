<template>
  <div class="iframe">
    <span class="mark icon-new-tab"></span>
    <div :class="['form-group', 'iframe_input_wrap', { 'has-error' : error }]">
      <input
        class="iframe_input form-input"
        @paste.stop
        type="url"
        v-model="visibleSource"
        :disabled="!editable"
      />
      <p v-if="error" class="form-input-hint">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce'

const WEB_URL = process.env.VUE_APP_URL

const verifiedHosts = [
  // YouTube
  function (src) {
    let match = src.match(/youtube.com\/watch\?v=([a-zA-Z0-9_]+)/)

    if (!match)
      return null

    return `https://www.youtube.com/embed/${match[1]}`
  },
  // Twitch
  function (src) {
    let match = src.match(/twitch.tv\/([a-zA-Z0-9]+)/)

    if (!match)
      return null

    return `https://player.twitch.tv/?channel=${match[1]}`
  },
  // Soundcloud
  function (src) {
    let match = src.match(/soundcloud\.com\/[a-zA-Z0-9_-]+\/(sets\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)/)

    if (!match)
      return null

    return `https://w.soundcloud.com/player/?url=${encodeURIComponent(src)}&color=%23f70000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true`
  },
  // Vimeo
  function (src) {
    let match = src.match(/vimeo\.com\/([0-9]+)/)

    if (!match)
      return null

    return `https://player.vimeo.com/video/${match[1]}`
  },
  // Twitter
  function (src) {
    let match = src.match(/twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+/)

    if (!match)
      return null

    return `https://twitframe.com/show?url=${encodeURIComponent(src)}`
  }
]

export default {
  props: ['node', 'updateAttrs', 'editable'],
  data () {
    return {
      error: null,
      throttled: null,
      visibleSource: ''
    }
  },
  mounted () {
    this.visibleSource = this.node.attrs.src

    this.throttled = throttle(1000, false, src => {
      this.checkUrl(src)
    })

    let verified = this.checkVerified(this.visibleSource)

    if (verified) {
      this.$nextTick(() => {
        this.updateSrc(verified)
      })
    } else {
      this.throttled.call(this, this.visibleSource)
    }
  },
  methods: {
    checkUrl (src) {
      fetch(src, {
        method: 'HEAD'
      })
        .then(res => {
          const headers = res.headers

          if (!headers['X-Frame-Options']) {
            this.updateSrc()
          } else {
            if (headers['X-Frame-Options'] === `allow-from ${WEB_URL}`) {
              this.updateSrc()
            } else {
              this.error = 'Текущий сайт не может быть отображен, так как на нем установлен заголовок "X-Frame-Options"'
            }
          }
        })
        .catch(_err => {
          this.error = 'Неверный адрес сайта'
        })
    },
    updateSrc (src) {
      this.updateAttrs({ src })
      this.error = null
    },
    checkVerified (src) {
      for (let i = 0; i < verifiedHosts.length; i++) {
        let host = verifiedHosts[i]
        let result = host(src)

        if (result)
          return result
      }

      return null
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

.iframe {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
  min-height: 100px;
  background: $gray-color-light;
}

.iframe .mark {
  position: absolute;
  left: 16px;
  top: 50%;
  opacity: 0.5;
  transform: translateY(-50%);
}

.iframe_input_wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
}

.iframe_input {
  background: none;
  border: none;
}
</style>

<style lang="scss">
iframe[src*="soundcloud.com"] {
  width: 100%;
}

iframe[src*="youtube.com"] {
  width: 100%;
  height: 100%;
}
</style>
