<template>
  <modal :open="isShowed" :closed="close" title="Редактирование ссылки" @ok="editLink()">
    <!-- <div :class="['form-group', 'mt-2']">
      <input class="form-input" placeholder="Название" v-model="title" autofocus />
    </div>-->
    <div :class="['form-group', 'mt-2']">
      <input
        @keyup.enter="editLink"
        @keyup.esc="close"
        class="form-input"
        type="url"
        placeholder="Ссылка"
        v-model="url"
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
      url: null,
      title: null
    }
  },
  methods: {
    close: function () {
      this.$emit("update:isShowed", false)
    },
    editLink () {
      this.command({ href: this.url })
      this.url = ''
      this.close()
    },
    refreshState () {
      const isLinkActive = this.editor.activeMarks.link()
      // console.log(JSON.stringify(this.editor.view.state.tr))
      if (isLinkActive) {
        // if link is active, then we edit link
        // this.title = this.editor.activeMarkAttrs.link.href
        this.url = this.editor.activeMarkAttrs.link.href
      } else {
        // newLink
        // this.title = ''
        if (this.editor.selection.from == this.editor.selection.to) {
          this.$toast.show('Выберите текст, который нужно пометить как ссылку')
          this.close()
        }
        this.url = ''
      }
    }
  },
  watch: {
    isShowed: function (newVal, _) {
      if (newVal) {
        this.refreshState()
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
