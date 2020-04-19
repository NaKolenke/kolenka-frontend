<template>
  <modal :open="isShowed" :closed="close" title="Добавить спойлер" @ok="insertSpoiler()">
    <div :class="['form-group', 'mt-2']">
      <input
        @keyup.enter="insertSpoiler"
        @keyup.esc="close"
        class="form-input"
        placeholder="Название: Спойлер"
        v-model="title"
        ref="input"
      />
    </div>
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
    command: Function,
    editor: Object
  },
  data: function () {
    return {
      title: null
    }
  },
  methods: {
    close: function () {
      this.$emit("update:isShowed", false)
    },
    insertSpoiler () {
      this.command({ name: this.title })
      this.title = ''
      this.close()
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
