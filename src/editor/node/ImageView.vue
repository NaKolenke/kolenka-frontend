<template>
  <span
    style="position: relative; display: inline-block;"
    @dragstart="dragStart"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <img :src="src" :alt="alt" :title="title" :class="{ 'active': selected }" :width="width" :height="height" />
    <div v-if="selected" class="controls">
      <div class="point top left" style="cursor: nw-resize" @mousedown.prevent.stop="onMouseDown" ></div>
      <div class="point top right" style="cursor: ne-resize" @mousedown.prevent.stop="onMouseDown" ></div>
      <div class="point bottom left" style="cursor: sw-resize" @mousedown.prevent.stop="onMouseDown" ></div>
      <div class="point bottom right" style="cursor: se-resize" @mousedown.prevent.stop="onMouseDown" ></div>
      <div v-if="width !== originalWidth || height !== originalHeight" class="btn btn-secondary btn-sm reset" @click="reset">Сбросить</div>
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
    ratio: 0,
    originalWidth: 0,
    originalHeight: 0,
    onMouseUp: null,
    onMouseMove: null
  }),
  mounted() {
    if (this.node.attrs.height && this.node.attrs.width) {
      this.width = parseInt(this.node.attrs.width)
      this.height = parseInt(this.node.attrs.height)
      
      getImageSize(this.src).then(size => {
        this.originalWidth = size.width
        this.originalHeight = size.height
        this.ratio = size.width / size.height
      })
    } else {
      getImageSize(this.src).then(size => {
        this.width = this.originalWidth = size.width
        this.height = this.originalHeight = size.height
        this.ratio = size.width / size.height
      })
    }
  },
  methods: {
    onMouseDown(mde) {
      this.isDragging = true

      let classes = mde.target.classList.value
      let isTopLeft = classes.indexOf('top') >= 0 && classes.indexOf('left') >= 0
      let isTopRight = classes.indexOf('top') >= 0 && classes.indexOf('right') >= 0
      let isBottomLeft = classes.indexOf('bottom') >= 0 && classes.indexOf('left') >= 0
      let isBottomRight = classes.indexOf('bottom') >= 0 && classes.indexOf('right') >= 0
      let isShiftPressed = mde.shiftKey

      document.addEventListener('mouseup', this.onMouseUp = (e) => {
        e.preventDefault()
        e.stopPropagation()

        this.updateAttrs({ width: this.width, height: this.height })

        this.isDragging = false
        document.removeEventListener('mouseup', this.onMouseUp)
        document.removeEventListener('mousemove', this.onMouseMove)
      })

      document.addEventListener('mousemove', this.onMouseMove = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (isTopLeft) {
          this.width -= e.movementX
          if (!isShiftPressed) {
            this.height -= e.movementY
          }          
        } else if (isTopRight) {
          this.width += e.movementX
          if (!isShiftPressed) {
            this.height -= e.movementY
          }   
        } else if (isBottomLeft) {
          this.width -= e.movementX
          if (!isShiftPressed) {
            this.height += e.movementY
          }   
        } else if (isBottomRight) {
          this.width += e.movementX
          if (!isShiftPressed) {
            this.height += e.movementY
          }   
        }
        
        if (isShiftPressed) {
          this.height = this.width / this.ratio
        }
      })
    },
    dragStart(e) {
      if (this.isDragging) {
        e.preventDefault()
      }
    },
    reset() {
      this.width = this.originalWidth
      this.height = this.originalHeight
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

.controls .reset {
  position: absolute;
  right: 8px;
  bottom: 16px;
}
</style>
