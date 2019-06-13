<template>
  <div class="form-group" style="position:relative">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }" :class="{ 'floating': menuBarFloats }" :style="[{ 'left': menuBarOffsetLeft }]">
      <div class="menu-bar">

        <button
          :class="[{ 'is-active': isActive.bold() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.bold"
          data-tooltip="Жирный"
        >
          <span class="icon-bold"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.italic() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.italic"
          data-tooltip="Наклонный"
        >
          <span class="icon-italic"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.underline() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.underline"
          data-tooltip="Подчёркнутый"
        >
          <span class="icon-underline"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.strike() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.strike"
          data-tooltip="Зачёркнутый"
        >
          <span class="icon-strikethrough"></span>
        </button>
        <button
          :class="[{ 'is-active': isActive.paragraph() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.paragraph"
          data-tooltip="Параграф"
        >
          <span class="icon-pilcrow"></span>
        </button>
        <div class="dropdown">
          <button
            :class="[{ 'is-active': isActive.color() && color !== '#3b4351' }, 'button', 'tooltip', 'dropdown-toggle', { 'tooltip-bottom': menuBarFloats }]"
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
            :class="[{ 'is-active': isActive.heading() }, 'button', 'tooltip', 'dropdown-toggle', { 'tooltip-bottom': menuBarFloats }]"
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

        <button
          v-if="isExtended"
          :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'left' }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.alignment({ textAlign: 'left' })" 
          data-tooltip="Выравнивание по левому краю"
        >
          <span class="icon-paragraph-left"></span>
        </button>
        <button
          v-if="isExtended"
          :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'center' }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.alignment({ textAlign: 'center' })" 
          data-tooltip="Выравнивание по центру"
        >
          <span class="icon-paragraph-center"></span>
        </button>
        <button
          v-if="isExtended"
          :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'right' }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.alignment({ textAlign: 'right' })" 
          data-tooltip="Выравнивание по правому краю"
        >
          <span class="icon-paragraph-right"></span>
        </button>
        <button
          v-if="isExtended"
          :class="[{ 'is-active': isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'justify' }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.alignment({ textAlign: 'justify' })" 
          data-tooltip="Выравнивание по ширине"
        >
          <span class="icon-paragraph-justify"></span>
        </button>

        <span class="span"></span>

        <button
          :class="[{ 'is-active': isActive.bullet_list() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]"
          @click="commands.bullet_list" 
          data-tooltip="Список"
        >
          <span class="icon-list2"></span>
        </button>
        <button 
          :class="[{ 'is-active': isActive.ordered_list() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.ordered_list" 
          data-tooltip="Нумерованный список"
        >
          <span class="icon-list-numbered"></span>
        </button>

        <span class="span"></span>

        <button
          :class="[{ 'is-active': isActive.blockquote() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.blockquote" 
          data-tooltip="Цитата"
        >
          <span class="icon-quotes-right"></span>
        </button>
        <button 
          :class="[{ 'is-active': isActive.code() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.code" 
          data-tooltip="Код"
        >
          <span class="icon-embed"></span>
        </button>
        <button 
          :class="[{ 'is-active': isActive.code_block() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.code_block" 
          data-tooltip="Блок кода"
        >
          <span class="icon-embed2"></span>
        </button>
        <button 
          :class="[{ 'is-active': isActive.image() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="imageModal.show = true" 
          data-tooltip="Изображение"
        >
          <span class="icon-image"></span>
        </button>

        <modal :open="imageModal.show" :closed="imageModalClose" title="Вставить изображение" @ok="chooseImage(commands.image_ex)">
          <ul class="tab tab-block">
            <li v-if="isActive.image()" :class="['tab-item', {'active': imageModal.tab === -1}]">
              <a href="#" @click.prevent="imageModal.tab = -1">Редактировать</a>
            </li>
            <li :class="['tab-item', {'active': imageModal.tab === 0}]">
              <a href="#" @click.prevent="imageModal.tab = 0">По ссылке</a>
            </li>
            <li :class="['tab-item', {'active': imageModal.tab === 1}]">
              <a href="#" @click.prevent="imageModal.tab = 1">Загрузить</a>
            </li>
          </ul>
          <br>

          <div v-if="imageModal.tab === -1">

          </div>

          <div v-if="imageModal.tab === 0">
            <div :class="['form-group', {'has-error': imageModal.urlError}]">
              <input class="form-input" type="url" placeholder="Ссылка на изображение" v-model="imageModal.url" autofocus />
              <p v-if="imageModal.urlError" class="form-input-hint">Введите ссылку на изображение</p>
            </div>
          </div>

          <div v-if="imageModal.tab === 1">
            <image-upload @complete="imageUploaded($event, commands.image_ex)" :multiple="true" />
          </div>
        </modal>

        <button 
          :class="[{ 'is-active': isActive.iframe() }, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="embedModal.show = true"
          data-tooltip="Embed (youtube, etc)"
        >
          <span class="icon-new-tab"></span>
        </button>

        <modal :open="embedModal.show" :closed="embedModalClose" title="Embed" @ok="chooseEmbed(commands.iframe)">
          <input class="form-input" type="url" placeholder="Ссылка (YouTube, Vimeo, Soundcloud, Twitch)" v-model="embedModal.url" autofocus />
        </modal>

        <span v-if="isExtended" class="span"></span>

        <button 
          v-if="isExtended" 
          :class="['button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.horizontal_rule" 
          data-tooltip="Горизонтальная линия"
        >
          <span class="icon-page-break"></span>
        </button>

        <span v-if="isExtended" class="span"></span>

        <button 
          v-if="isExtended" 
          :class="[{'is-active': isActive.table()}, 'button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })" 
          data-tooltip="Таблица"
        >
          <span class="icon-table2"></span>
        </button>

        <span class="span"></span>

        <button
          :class="['button', 'tooltip', { 'tooltip-bottom': menuBarFloats }]" 
          @click="showHelp = true" 
          data-tooltip="Помощь"
        >
          ?
        </button>

        <modal :open="showHelp" :closed="closeHelp" title="Помощь по редактору текста" size="lg" :hideButtons="true">
          <h4>Общее</h4>
          <p>Для добавления переноса на новую строку используйте <kbd>Ctrl/Shift+Return</kbd></p>
          <p>Редактор поддерживает некоторые правила Markdown</p>
          <h4>Embed</h4>
          <p>Поддерживаемые сервисы: YouTube, Vimeo, Soundcloud, Twitch, Twitter</p>
        </modal>

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
    <div :class="[editorClass, 'editor', 'form-input']" ref="editorWrapper">
      <editor-content :editor="editor"></editor-content>
    </div>
    <small v-if="limit > 0" style="position:absolute;bottom:-18px;right:4px">{{ store.length }} / {{ limit }}</small>
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
import Alignment from '@/editor/mark/Align'
import Color from '@/editor/mark/Color'
import CBExtended from '@/editor/extensions/CodeBlockExtended'
import Limit from '@/editor/extensions/Limit'
import Iframe from '@/editor/node/iframe'
import Modal from '@/components/elements/Modal.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import ColorPicker from '@caohenghu/vue-colorpicker'
import ImageExtended from '@/editor/node/ImageExtended'

export default {
  props: {
    type: null, // type: basic, extended
    editorClass: null,
    limit: {
      type: Number,
      default: -1
    }, // -1 = no limit, 0 = readonly, 1+ = limit
    store: {
      type: Object,
      default() {
        return {
          html: '',
          text: '',
          length: 0
        }
      }
    },
    storageKey: {
      type: String,
      default: null
    },
    storageType: {
      type: String,
      default: 'session' // session, local
    }
  },
  data() {
    return {
      editor: null,
      imageModal: {
        show: false,
        url: '',
        tab: 0,
        urlError: false,
        uploadError: null
      },
      embedModal: {
        show: false,
        url: ''
      },
      color: '#3b4351',
      isFocused: false,
      menuBarFloats: false,
      menuBarOffsetLeft: '0px',
      showHelp: false
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
        ImageExtended(),
        new CBExtended(),
        new Iframe()
      ],
      onFocus() {
        self.isFocused = true
      },
      onBlur() {
        self.isFocused = false
      },
      onUpdate() {
        self.store.html = self.editor.getHTML()
        self.store.text = self.editor.state.doc.textContent
        self.store.length = self.store.text.length
      },
      content: this.storageValue() || ''
    }

    if (this.limit > 0) {
      options.extensions.push(new Limit({
        limit: this.limit
      }))
    } else if (this.limit === 0) {
      options.editable = false
    }

    if (this.isExtended) {
      options.extensions.push(
        new History(),
        new Heading({ levels: [ 1, 2, 3, 4, 5, 6 ] }),
        new HorizontalRule(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new Alignment()
      )
    }

    this.editor = new Editor(options)

    window.addEventListener('keydown', this.onKeyDown)
    if (this.isExtended)
      window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    this.editor.destroy()

    window.removeEventListener('keydown', this.onKeyDown)
    if (this.isExtended)
      window.removeEventListener('scroll', this.onScroll)

    if (this.storageKey) {
      if (this.storageType === 'session') {
        sessionStorage.setItem(this.storageKey, this.store.html)
      } else {
        localStorage.setItem(this.storageKey, this.store.html)
      }
    }
  },
  methods: {
    imageModalClose() {
      this.imageModal.show = false
      this.imageModal.urlError = false
    },
    setContent(body) {
      this.editor.setContent(body)
      this.store.html = this.editor.getHTML()
      this.store.text = this.editor.state.doc.textContent
      this.store.length = this.store.text.length
    },
    chooseImage(command) {
      if (this.imageModal.url.length > 0) {
        command({ src: this.imageModal.url })
        this.imageModal.url = ''
        this.imageModalClose()
      } else {
        this.imageModal.urlError = true
      }
    },
    imageUploaded(images, command) {
      images.forEach(i => {
        command({ src: `https://beta.kolenka.net/content/${i.id}` })
      })

      this.imageModal.show = false
    },
    chooseEmbed(command) {
      if (this.embedModal.url.length > 0) {
        command({ src: this.embedModal.url })
        this.embedModal.url = ''
        this.embedModal.show = false
      }      
    },
    embedModalClose() {
      this.embedModal.show = false
    },
    colorChanged(color, command) {
      let { rgba: { r, g, b } } = color
      command({ color: `rgb(${r}, ${g}, ${b})` })
    },
    onKeyDown(e) {
      if (e.keyCode === 9 &&
          this.isFocused &&
          this.editor.isActive.code_block()) {
        e.preventDefault()
      }
    },
    onScroll(e) {
      let wrapper = this.$refs.editorWrapper
      let scroll = window.pageYOffset || document.documentElement.scrollTop
      let clientRect = wrapper.getBoundingClientRect()
      
      if (scroll > clientRect.top + scroll) {
        this.menuBarOffsetLeft = clientRect.left + 1 + 'px'
        this.menuBarFloats = true
      } else {
        this.menuBarFloats = false
      }
    },
    closeHelp() {
      this.showHelp = false
    },
    storageValue() {      
      if (this.storageType === 'local') {
        return localStorage.getItem(this.storageKey)
      } else {
        return sessionStorage.getItem(this.storageKey)
      }
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
    ColorPicker,
    ImageUpload
  }
}
</script>

<style lang="scss" scoped>
@import './node_modules/spectre.css/src/_variables.scss';

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
  //background: #cecece;
  background: $primary-color;
  color: $secondary-color;
}

.menu-bar .span {
  display: inline-block;
  width: 12px;
}

.menu-bar.floating {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background: #fff;
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
