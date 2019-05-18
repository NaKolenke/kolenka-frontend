<template>
  <div class="form-group">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menu-bar">

        <button
          :class="[{ 'is-active': isActive.bold() }, 'button', 'tooltip']"
          @click="commands.bold"
          data-tooltip="Жирный"
        >
          <span class="icon-bold"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.italic() }, 'button', 'tooltip']"
          @click="commands.italic"
          data-tooltip="Наклонный"
        >
          <span class="icon-italic"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.underline() }, 'button', 'tooltip']"
          @click="commands.underline"
          data-tooltip="Подчёркнутый"
        >
          <span class="icon-underline"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.strike() }, 'button', 'tooltip']"
          @click="commands.strike"
          data-tooltip="Зачёркнутый"
        >
          <span class="icon-strikethrough"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.paragraph() }, 'button', 'tooltip']"
          @click="commands.paragraph"
          data-tooltip="Параграф"
        >
          <span class="icon-pilcrow"></span>
        </button>
        <div class="dropdown">
          <button
            :class="[{ 'is-active': isActive.color() && color !== '#3b4351' }, 'button', 'tooltip', 'dropdown-toggle']"
            data-tooltip="Цвет текста"
          >
            <span class="icon-eyedropper"></span>
          </button>
          <div class="menu">
            <color-picker
              theme="light"
              :color="color"
              :sucker-hide="true"
              @changeColor="colorChanged($event, commands.color)"
              :colors-default="['#000000', '#FFFFFF', '#FF1900', '#F47365',
                                '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1',
                                '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF',
                                '#FC3CAD', '#BF3DCE', '#8E00A7', '#3b4351']"
            />
          </div>
        </div>

        <span v-if="isExtended" class="span"></span>

        <div v-if="isExtended" class="dropdown">
          <button
            :class="[{ 'is-active': isActive.heading() }, 'button', 'tooltip', 'dropdown-toggle']"
            tabindex="0"
            data-tooltip="Заголовок"
          >
            <span class="icon-font-size"></span>
          </button>
          <!-- menu component -->
          <div class="menu">
            <button
              v-for="i in (1, 6)"
              :key="i"
              :class="[{ 'is-active': isActive.heading({ level: i }) }, 'button']"
              @click="commands.heading({ level: i })"
            >
              <h1 v-if="i == 1" style="width: 230px">Заголовок {{ i }}</h1>
              <h2 v-if="i == 2">Заголовок {{ i }}</h2>
              <h3 v-if="i == 3">Заголовок {{ i }}</h3>
              <h4 v-if="i == 4">Заголовок {{ i }}</h4>
              <h5 v-if="i == 5">Заголовок {{ i }}</h5>
              <h6 v-if="i == 6">Заголовок {{ i }}</h6>
            </button>
          </div>
        </div>

        <button v-if="isExtended" :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'left' }, 'button', 'tooltip']" @click="commands.alignment({ textAlign: 'left' })" data-tooltip="Выравнивание по левому краю">
          <span class="icon-paragraph-left"></span>
        </button>
        <button v-if="isExtended" :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'center' }, 'button', 'tooltip']" @click="commands.alignment({ textAlign: 'center' })" data-tooltip="Выравнивание по центру">
          <span class="icon-paragraph-center"></span>
        </button>
        <button v-if="isExtended" :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'right' }, 'button', 'tooltip']" @click="commands.alignment({ textAlign: 'right' })" data-tooltip="Выравнивание по правому краю">
          <span class="icon-paragraph-right"></span>
        </button>
        <button v-if="isExtended" :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'justify' }, 'button', 'tooltip']" @click="commands.alignment({ textAlign: 'justify' })" data-tooltip="Выравнивание по ширине">
          <span class="icon-paragraph-justify"></span>
        </button>

        <span class="span"></span>

        <button :class="[{ 'is-active': isActive.bullet_list() }, 'button', 'tooltip']" @click="commands.bullet_list" data-tooltip="Список">
          <span class="icon-list2"></span>
        </button>
        <button :class="[{ 'is-active': isActive.ordered_list() }, 'button', 'tooltip']" @click="commands.ordered_list" data-tooltip="Нумерованный список">
          <span class="icon-list-numbered"></span>
        </button>

        <span class="span"></span>

        <button :class="[{ 'is-active': isActive.blockquote() }, 'button', 'tooltip']" @click="commands.blockquote" data-tooltip="Цитата">
          <span class="icon-quotes-right"></span>
        </button>
        <button :class="[{ 'is-active': isActive.code() }, 'button', 'tooltip']" @click="commands.code" data-tooltip="Код">
          <span class="icon-embed"></span>
        </button>
        <button :class="[{ 'is-active': isActive.code_block() }, 'button', 'tooltip']" @click="commands.code_block" data-tooltip="Блок кода">
          <span class="icon-embed2"></span>
        </button>
        <button :class="[{ 'is-active': isActive.image() }, 'button', 'tooltip']" @click="showImageModal = true" data-tooltip="Изображение">
          <span class="icon-image"></span>
        </button>

        <modal :open="showImageModal" :closed="imageModalClose" title="Вставить изображение" @ok="chooseImage(commands.image)">
          <ul class="tab tab-block">
            <li :class="['tab-item', {'active': imageModalTab === 0}]">
              <a href="#" @click.prevent="imageModalTab = 0">По ссылке</a>
            </li>
            <li :class="['tab-item', {'active': imageModalTab === 1}]">
              <a href="#" @click.prevent="imageModalTab = 1">Загрузить</a>
            </li>
          </ul>
          <br>
          <div v-if="imageModalTab === 0">
            <div :class="['form-group', {'has-error': imageUrlError}]">
              <input class="form-input" type="url" placeholder="Ссылка на изображение" v-model="imageUrl">
              <p v-if="imageUrlError" class="form-input-hint">Введите ссылку на изображение</p>
            </div>
          </div>
          <div v-if="imageModalTab === 1">
            <form ref="image" @submit.prevent="" :class="['form-group', {'has-error': imageUploadError}]">
              <div class="input-group" style="margin: 0 auto">
                <input class="file-input" type="file" name="file" id="file" accept=".jpg, .jpeg, .png, .gif" @change="fileInputChange">
                <label for="file" class="btn input-group-btn btn-primary"><i class="icon icon-photo"></i> {{ fileInputLabel }}</label>
                <button :class="['btn', 'input-group-btn', { 'loading': imageUploadLoading }]" @click="uploadImage(commands.image)" :disabled="fileInputEmpty">Загрузить</button>
              </div>
              <p v-if="imageUploadError" class="form-input-hint">{{ imageUploadError }}</p>
            </form>
          </div>
        </modal>

        <span v-if="isExtended" class="span"></span>

        <button v-if="isExtended" :class="['button', 'tooltip']" @click="commands.horizontal_rule" data-tooltip="Горизонтальная линия">
          <span class="icon-page-break"></span>
        </button>

        <span v-if="isExtended" class="span"></span>

        <button v-if="isExtended" :class="[{'is-active': isActive.table()}, 'button', 'tooltip']" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })" data-tooltip="Таблица">
          <span class="icon-table2"></span>
        </button>

        <div v-if="isActive.code_block()">
          <small>Для выхода из режима редактирования кода нажмите Ctrl/Shift+Return</small>
        </div>

        <div v-if="isExtended && isActive.table()" class="mt-1">
          <small>Редактировать таблицу </small>

          <button
            class="button tooltip"
            @click="commands.deleteTable"
            data-tooltip="Удалить таблицу"
          >
            <span class="icon-blocked"></span>
          </button>
          <button
            class="button tooltip"
            @click="commands.addColumnBefore"
            data-tooltip="Добавить колонку перед"
          >
            <span class="icon-arrow-left2"></span>
          </button>
          <button
            class="button tooltip"
            @click="commands.addColumnAfter"
            data-tooltip="Добавить колонку после"
          >
            <span class="icon-arrow-right2"></span>
          </button>
          <button
            class="button"
            @click="commands.deleteColumn"
          >
            удалить колонку
          </button>
          <button
            class="button tooltip"
            @click="commands.addRowBefore"
            data-tooltip="Добавить строку перед"
          >
            <span class="icon-arrow-up2"></span>
          </button>
          <button
            class="button tooltip"
            @click="commands.addRowAfter"
            data-tooltip="Добавить строку после"
          >
            <span class="icon-arrow-down2"></span>
          </button>
          <button
            class="button"
            @click="commands.deleteRow"
          >
            удалить строку
          </button>
          <button
            class="button tooltip"
            @click="commands.toggleCellMerge"
            data-tooltip="Объединить ячейки"
          >
            <span class="icon-insert-template"></span>
          </button>
        </div>

      </div>
    </editor-menu-bar>
    <div :class="[editorClass, 'editor', 'form-input']">
      <editor-content :editor="editor"></editor-content>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  HorizontalRule,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from 'tiptap-extensions'
import Modal from '@/components/Modal'
import Alignment from '@/editor/mark/Align'
import Color from '@/editor/mark/Color'
import ContentService from '@/services/content'
import ColorPicker from '@caohenghu/vue-colorpicker'
import CBExtended from '@/editor/extensions/CodeBlockExtended'

export default {
  props: [ 'type', 'editorClass', 'limit' ], // type: basic, extended
  data() {
    return {
      editor: null,
      showImageModal: false,
      imageUrl: '',
      imageModalTab: 0,
      imageUrlError: false,
      imageUploadError: null,
      color: '#3b4351',
      fileInputLabel: 'Выберите файл...',
      fileInputEmpty: true,
      isFocused: false,
      imageUploadLoading: false
    }
  },
  mounted() {
    const self = this

    const options = {
      extensions: [
        new Bold(),
        new Italic(),
        new Link(),
        new Underline(),
        new Strike(),
        new Color(),
        new HardBreak(),

        new ListItem(),
        new BulletList(),
        new OrderedList(),

        new Blockquote(),
        new Code(),
        new CodeBlock(),
        new Image(),
        new CBExtended()
      ],
      onFocus() {
        self.isFocused = true
      },
      onBlur() {
        self.isFocused = false
      }
    }

    if (this.isExtended) {
      options.extensions.push(
        new History(),
        new Heading({ levels: [1, 2, 3, 4, 5, 6] }),
        new HorizontalRule(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new Alignment()
      )
    }

    this.editor = new Editor(options)

    window.addEventListener('keydown', (e) => {
      if (e.keyCode === 9 && this.isFocused && this.editor.isActive.code_block()) {
        e.preventDefault()
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    imageModalClose() {
      this.showImageModal = false
      this.imageUrlError = false
    },
    chooseImage(command) {
      if (this.imageUrl.length > 0) {
        command({ src: this.imageUrl })
        this.imageUrl = ''
        this.imageModalClose()
      } else {
        this.imageUrlError = true
      }
    },
    content() {
      return this.editor.getHTML()
    },
    setContent(body) {
      this.editor.setContent(body)
    },
    uploadImage(command) {
      this.imageUploadError = null
      this.imageUploadLoading = true
      ContentService.uploadFile(new FormData(this.$refs.image)).then(data => {
        let url = 'https://beta.kolenka.net/content/' + data.file.id
        this.imageUploadLoading = false
        command({ src: url })
        this.imageModalClose()
      }).catch(err => {
        this.imageUploadError = err
      })
    },
    fileInputChange(e) {
      if (e.target.value.length > 0) {
        this.fileInputLabel = e.target.value.split( '\\' ).pop()
        this.fileInputEmpty = false
      } else {
        this.fileInputLabel = 'Выберите файл...'
        this.fileInputEmpty = true
      }
    },
    colorChanged(color, command) {
      let { rgba: { r, g, b } } = color
      command({ color: `rgb(${r}, ${g}, ${b})` })
    }
  },
  computed: {
    isBasic() {
      return this.type == null || this.type === 'basic'
    },
    isExtended() {
      return this.type === 'extended'
    }
  },
  components: {
    EditorContent,
    EditorMenuBar,
    Modal,
    ColorPicker
  }
}
</script>

<style scoped>
.editor {
  height: auto;
}

.menu-bar {
  font-size: 14px;
  margin-bottom: 6px;
}

.menu-bar .button {
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  padding: 2px 10px;
  border-radius: 3px;
}

.menu-bar .button:hover,
.menu-bar .button.is-active {
  background: #cecece;
}

.menu-bar .span {
  display: inline-block;
  width: 12px;
}

.dropdown .button {
  border-radius: 0;
  width: 100%;
  text-align: left;
}

.file-input {
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

</style>

<style lang="scss">
.hu-color-picker.light {
  box-shadow: none;
  background: none;
  padding: 0;
}

.hu-color-picker .color-set .alpha {
  display: none; /* hide opacity slider */
}

.hu-color-picker .color-type:last-of-type {
  display: none; /* hide rgba display */
}
</style>
