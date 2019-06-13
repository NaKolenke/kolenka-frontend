<template>
  <span
    style="position: relative; display: inline-block;"
  >
    <img :src="src" :alt="alt" :title="title" :class="{ 'active': selected }" :width="width" :height="height" />
    <div v-if="selected" class="controls">
      <div class="point top left" style="cursor: nw-resize" @click="onMouseDown('topLeft')"></div>
      <div class="point top right" style="cursor: ne-resize" @click="onMouseDown('topRight')"></div>
      <div class="point bottom left" style="cursor: sw-resize" @click="onMouseDown('bottomLeft')"></div>
      <div class="point bottom right" style="cursor: se-resize" @click="onMouseDown('bottomRight')"></div>
    </div>
  </span>
</template>

<script>
import { getImageSize } from '@/utils/vanilla'

export default {
  props: ['node', 'updateAttrs', 'editable', 'selected'],
  data: () => ({
    imageRef: null,
    isDragging: false,
    currentPos: null,
    width: 0,
    height: 0,
    ratio: 0
  }),
  mounted() {
    getImageSize(this.src).then(size => {
      this.width = size.width
      this.height = size.height
      this.ratio = size.width / size.height
    })
    
    window.addEventListener('mousemove', this.onMouseMove.bind(this))
    window.addEventListener('mouseup', this.onMouseUp.bind(this))
    // TODO: press ctrl to use original aspect ratio
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseup', this.onMouseUp)
  },
  methods: {
    onMouseDown(position) {
      this.currentPos = position
      this.isDragging = true
    },
    onMouseUp(e) {
      this.isDragging = false
    },
    onMouseMove(e) {
      if (!this.isDragging || this.currentPos == null)
        return
      
      switch(this.currentPos) {
        case 'topLeft': {
          this.width += e.movementX
          this.height += e.movementY
        } break
        case 'topRight': {
          this.width += e.movementX
          this.height += e.movementY
        } break
        case 'bottomLeft': {
          this.width += e.movementX
          this.height += e.movementY
        } break
        case 'bottomRight': {
          this.width += e.movementX
          this.height += e.movementY
        } break
      }
    }
  },
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
