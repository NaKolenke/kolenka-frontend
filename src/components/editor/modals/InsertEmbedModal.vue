<template>
  <modal :open="isShowed" :closed="close" title="Embed" @ok="chooseEmbed()">
    <input
      @keyup.enter="chooseEmbed"
      @keyup.esc="close"
      class="form-input"
      type="url"
      placeholder="Ссылка (YouTube, Vimeo, Soundcloud, Twitch)"
      v-model="embedModalUrl"
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
  watch: {
    isShowed: function (newVal, _) {
      if (newVal) {
        this.$nextTick(function () {
          this.$refs.input.focus()
        });
      }
    }
  },
  components: {
    Modal
  }
}
</script>
