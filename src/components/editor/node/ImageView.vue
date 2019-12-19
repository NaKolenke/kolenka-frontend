<template>
  <span
    class="container"
    @dragstart="dragStart"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <img :src="src" :alt="alt" :title="title" :class="{ 'active': selected }" :width="width" :height="height" />
    <div v-if="selected" class="controls">
      <div class="point top left" style="cursor: nw-resize" @mousedown.prevent.stop="onMouseDown"></div>
      <div class="point top right" style="cursor: ne-resize" @mousedown.prevent.stop="onMouseDown"></div>
      <div class="point bottom left" style="cursor: sw-resize" @mousedown.prevent.stop="onMouseDown"></div>
      <div class="point bottom right" style="cursor: se-resize" @mousedown.prevent.stop="onMouseDown"></div>
      <div class="buttons btn-group">
        <button class="btn btn-secondary btn-sm tooltip" @click="openInfoModal" data-tooltip="Редактировать инфо"><i class="icon icon-edit"></i></button>
        <button v-if="width !== originalWidth || height !== originalHeight" class="btn btn-secondary btn-sm tooltip" @click="reset" data-tooltip="Сбросить размер"><i class="icon icon-cross"></i></button>
      </div>
    </div>
    <modal title="Информация об изображении" ref="infoModal" @ok="$refs.infoModal.close()">
      <div class="form-group">
        <label class="form-label" for="input-1">Название</label>
        <input class="form-input" type="text" id="input-1" v-model="title">
      </div>
      <div class="form-group">
        <label class="form-label" for="input-2">Альтернативный текст</label>
        <input class="form-input" type="text" id="input-2" v-model="alt">
      </div>
    </modal>
  </span>
</template>

<script>
import { getImageSize } from '@/utils/vanilla'
import Modal from '@/components/elements/Modal.vue'

export default {
  props: ['node', 'updateAttrs', 'editable', 'selected'],
  data () {
    return {
      isDragging: false,
      currentPos: null,
      width: 0,
      height: 0,
      ratio: 0,
      originalWidth: 0,
      originalHeight: 0,
      onMouseUp: null,
      onMouseMove: null
    }
  },
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
    },
    openInfoModal() {
      this.$refs.infoModal.openModal()
    }
  },
  computed: {
    src: {
      get() {
        return this.node.attrs.src
      },
      set(src) {
        this.updateAttrs({ src })
      }
    },
    alt: {
      get() {
        return this.node.attrs.alt
      },
      set(alt) {
        this.updateAttrs({ alt })
      }
    },
    title: {
      get() {
        return this.node.attrs.title
      },
      set(title) {
        this.updateAttrs({ title })
      }
    }
  },
  components: {
    Modal
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  display: inline-block;
}

.active {
  border: 1px dashed blueviolet;
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

.controls .buttons {
  position: absolute;
  right: 16px;
  bottom: 16px;
}
</style>
