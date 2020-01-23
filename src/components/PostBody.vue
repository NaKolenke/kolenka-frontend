<template>
  <v-runtime-template :template="template"></v-runtime-template>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import Sticker from '@/components/elements/Sticker'

export default {
  props: {
    html: String,
  },
  computed: {
    template () {
      // Remove cut tag, because it was handled at upper level
      var template = this.processCut(this.html)
      // replace stickers
      template = this.processStickers(template)
      // wrap in single div, so vue can handle it as proper component
      return `<div>${template}</div>`
    },
  },
  methods: {
    processCut (template) {
      var processed = template.replace(/(<cut>)/gm, ``)
      processed = processed.replace(/(<cut><\/cut >)/gm, ``)
      processed = processed.replace(/(<cut name="[a-zA-Zа-яА-Я .,!?\-0-9]*"><\/cut >)/gm, ``)
      return processed
    },
    processStickers (template) {
      return template.replace(/:([a-z0-9_]*?):/gm, `<sticker name="$1"/>`)
    }
  },
  components: {
    Sticker, //  eslint-disable-line vue/no-unused-components
    VRuntimeTemplate
  }
}
</script>

<style scoped>
</style>
