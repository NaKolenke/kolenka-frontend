<template>
  <modal :open="isShowed" :closed="close" title="Embed" @ok="chooseEmbed()">
    <input
      class="form-input"
      type="url"
      placeholder="Ссылка (YouTube, Vimeo, Soundcloud, Twitch)"
      v-model="embedModalUrl"
      autofocus
    />
  </modal>
</template>

<script>
import Modal from '@/components/elements/Modal.vue'


export default {
  props: {
    isShowed: {
      type: Boolean,
      default: false
    },
    command: Function
  },
  data: function () {
    return {
      embedModalUrl: null,
    }
  },
  methods: {
    close: function () {
      this.$emit("update:isShowed", false)
    },
    chooseEmbed () {
      if (this.embedModalUrl.length > 0) {
        this.command({ src: this.embedModalUrl })
        this.embedModalUrl = ''
        this.close()
      }
    },
  },
  components: {
    Modal
  }
}
</script>
