<template>
  <div :class="[{ 'modal': !size }, { 'modal-sm': size === 'sm' }, { 'modal-lg': size === 'lg' }, {'active' : isOpen}]">
    <a href="#close" class="modal-overlay" aria-label="Close" @click.prevent="close"></a>
    <div class="modal-container">
      <div class="modal-header">
        <a class="btn btn-clear float-right" aria-label="Close" @click.prevent="close"></a>
        <div class="modal-title h5" v-if="title">{{ title }}</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <slot></slot>
        </div>
      </div>
      <div class="modal-footer">
        <div class="btn-group">
          <button class="btn btn-primary" @click="onOk">OK</button>
          <button class="btn" @click="onCancel">Отмена</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: Boolean,
    closed: Function,
    title: String,
    size: String
  },
  data() {
    return {
      isOpen: this.open
    }
  },
  methods: {
    close() {
      this.isOpen = false
      if (this.closed) {
        this.closed()
      }
    },
    onOk() {
      this.$emit('ok')
    },
    onCancel() {
      this.$emit('cancel')
      this.close()
    }
  },
  watch: {
    'open'(oldVal, newVal) {
      this.isOpen = this.open
    }
  }
}
</script>
