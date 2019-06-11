<template>
  <span
    style="position: relative; display: inline-block;"
  >
    <img :src="src" :alt="alt" :title="title" :class="{ 'active': selected }" ref="image" />
    <div v-if="selected" class="controls">
      <div class="point top left" style="cursor: nw-resize"></div>
      <div class="point top right" style="cursor: ne-resize"></div>
      <div class="point bottom left" style="cursor: sw-resize"></div>
      <div class="point bottom right" style="cursor: se-resize"></div>
    </div>
  </span>
</template>

<script>
export default {
  props: ['node', 'updateAttrs', 'editable', 'selected'],
  data: () => ({
    imageRef: null
  }),
  computed: {
    src: {
      get() {
        return this.node.attrs.src
      },
      set(src) {
        return this.updateAttrs({ src })
      }
    },
    alt: {
      get() {
        return this.node.attrs.alt
      },
      set(alt) {
        return this.updateAttrs({ alt })
      }
    },
    title: {
      get() {
        return this.node.attrs.title
      },
      set(title) {
        return this.updateAttrs({ title })
      }
    },
    width: {
      get() {
        return this.$refs.image ? this.$refs.image.width : 0
      }
    },
    height: {
      get() {
        return this.$refs.image ? this.$refs.image.height : 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  border: 1px dashed blueviolet;
}

.controls {
 
}

.point {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #fff;
  border: 1px solid #000;
}

.top {
  top: 0;
}

.bottom {
  bottom: 0;
}

.left {
  left: 0;
}

.right {
  right: 0;
}
</style>
