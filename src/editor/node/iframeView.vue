<template>
  <div class="iframe">
    <input class="iframe_input form-input" @paste.stop type="url" v-model="src" v-if="editable" />
  </div>
</template>

<script>
export default {
  props: ['node', 'updateAttrs', 'editable'],
  computed: {
    src: {
      get() {
        return this.node.attrs.src
      },
      set(src) {
        this.updateAttrs({
          src,
        })
      },
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../../../node_modules/spectre.css/src/_variables.scss';

.iframe {
  position: relative;
  display: inline-block;
  width: 100%;
  height: auto;
  min-height: 100px;
  background: $gray-color-light;
}

.iframe_embed {
  opacity: 0.5;
}

.iframe_input {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  transform: translate(-50%, -50%);
  background: none;
  border: none;
}
</style>

