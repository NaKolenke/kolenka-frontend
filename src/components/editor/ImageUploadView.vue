<template>
  <div
    :class="['empty', { 'bg-primary': highlightDrag }]"
    @dragenter.prevent.stop="onDrag(true)"
    @dragover.prevent.stop
    @dragleave.prevent.stop="onDrag(false)"
    @drop.prevent.stop="onDrop($event)"
  >
    <div v-if="noFileSelected" class="empty-icon">
      <i v-if="!$slots.default" class="icon icon-3x icon-photo"></i>
      <slot></slot>
    </div>
    <p
      v-if="noFileSelected"
      class="empty-title h5"
    >Перетащите или выберите {{ multiple ? 'изображения' : 'изображение' }}</p>
    <div v-if="!noFileSelected">
      <div v-for="(item, index) in preview" :key="index" class="tile">
        <div class="tile-icon">
          <img :src="item.url" width="100" />
        </div>
        <div class="tile-content">
          <div class="tile-title text-left">
            <span v-if="item.uploading" class="loading" style="margin-right:16px;margin-left: 8px"></span>
            {{ item.name }}
          </div>
          <div class="tile-subtitle">
            <div v-if="!item.uploading" class="input-group">
              <!--<button class="btn input-group-btn btn-link tooltip" data-tooltip="Редактировать"><i class="icon icon-edit"></i></button>-->
              <button
                class="btn input-group-btn btn-link tooltip"
                @click.prevent="removeImage(index)"
                data-tooltip="Убрать"
              >
                <i class="icon icon-cross"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty-action">
      <form @submit.prevent :class="['form-group', {'has-error': hasError }]">
        <div class="input-group p-centered">
          <input
            class="file-input"
            type="file"
            name="file"
            id="file"
            accept=".jpg, .jpeg, .png, .gif"
            @change="fileInputChange"
            :multiple="multiple"
          />
          <label for="file" class="btn input-group-btn btn-primary">
            <i class="icon icon-upload"></i>
            {{ files.map(x => x.name).join(", ") || 'Выберите файл...' }}
          </label>
          <button
            :class="['btn', 'input-group-btn', { 'loading': inProgress }]"
            @click.prevent="upload"
            :disabled="inProgress || noFileSelected"
          >Загрузить</button>
        </div>
        <p v-if="hasError" class="form-input-hint">{{ hasError }}</p>
      </form>
    </div>
  </div>
</template>

<script>
/**
 * Events:
 *  @complete - when all files were uploaded. Gets uploaded file array
 */
import errors from '@/utils/errors'

export default {
  props: {
    multiple: Boolean, // If true multiple file uploading enabled
    max: Number, // Maximum file count for multiple file uploading
  },
  data: () => ({
    hasError: null,
    files: [],
    preview: [],
    inProgress: false,
    highlightDrag: false
  }),
  methods: {
    fileInputChange (e) {
      if (e.target.files.length > 0) {
        this.files = this.fileListToArray(e.target.files)
        this.resolvePreview()
      }
    },
    onDrag (isOver) {
      this.highlightDrag = isOver
    },
    onDrop (e) {
      const dt = e.dataTransfer
      const files = dt.files

      if (this.files.length > 0 && !this.multiple) {
        let file = this
          .fileListToArray(files)
          .filter(x => x.type.startsWith('image'))[0]

        if (file) {
          this.files = [file]
        }
      } else {
        this.files = this.files.concat(
          this
            .fileListToArray(files)
            .filter(x => x.type.startsWith('image'))
        )
      }

      this.highlightDrag = false
      this.resolvePreview()
    },
    removeImage (index) {
      this.preview.splice(index, 1)
      this.files.splice(index, 1)
    },
    fileListToArray (list) {
      let files = []

      for (let i = 0; i < list.length; i++) {
        files.push(list[i])
      }

      return files
    },
    resolvePreview () {
      let items = []

      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i]

        const reader = new FileReader()
        reader.onload = e => {
          const url = e.target.result

          items.push({ name: file.name, url, uploading: false })
        }
        reader.readAsDataURL(file)
      }

      this.preview = items
    },
    upload () {
      this.inProgress = true

      let output = []
      let root = Promise.resolve()

      this.files.forEach((item, index) => {
        const data = new FormData()
        data.append('file', item, item.name)

        const previewItem = this.preview[index]
        previewItem.uploading = true

        root = root
          .then(() => this.$store.dispatch('content/uploadFile', { file: data }))
          .then(file => {
            previewItem.uploading = false
            let fileIndex = this.files.indexOf(item)
            this.removeImage(fileIndex)
            output.push(file)
          })
          .catch(error => {
            errors.handle(error)
            this.$toast.error(errors.getText(error))

            previewItem.uploading = false
          })
      })

      root.then(() => {
        this.$emit('complete', output)
        this.inProgress = false
      })
    }
  },
  computed: {
    noFileSelected () {
      return this.files.length === 0
    }
  }
}
</script>

<style scoped>
.file-input {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
</style>
