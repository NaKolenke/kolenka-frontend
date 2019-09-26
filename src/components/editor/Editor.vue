<template>
  <div class="form-group" style="position:relative">
    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive }"
      :class="{ 'floating': menuBarFloats }"
      :style="[{ 'left': menuBarOffsetLeft }]"
    >
      <div class="menu-bar">
        <editor-button
          name="Жирный"
          :active="isActive.bold()"
          @command="commands.bold"
          :floats="menuBarFloats"
        >
          <span class="icon-bold"></span>
        </editor-button>
        <editor-button
          name="Наклонный"
          :active="isActive.italic()"
          @command="commands.italic"
          :floats="menuBarFloats"
        >
          <span class="icon-italic"></span>
        </editor-button>
        <editor-button
          name="Подчёркнутый"
          :active="isActive.underline()"
          @command="commands.underline"
          :floats="menuBarFloats"
        >
          <span class="icon-underline"></span>
        </editor-button>
        <editor-button
          name="Зачёркнутый"
          :active="isActive.strike()"
          @command="commands.strike"
          :floats="menuBarFloats"
        >
          <span class="icon-strikethrough"></span>
        </editor-button>
        <editor-button
          name="Параграф"
          :active="isActive.paragraph()"
          @command="commands.paragraph"
          :floats="menuBarFloats"
        >
          <span class="icon-pilcrow"></span>
        </editor-button>

        <editor-button
          name="Цвет текста"
          :active="isActive.color() && color !== '#3b4351'"
          :floats="menuBarFloats"
          :dropdown="true"
        >
          <span class="icon-eyedropper"></span>
          <template v-slot:dropdown>
            <color-picker
              theme="light"
              :sucker-hide="true"
              @changeColor="colorChanged($event, commands.color)"
              :colors-default="['#000000', '#FFFFFF', '#FF1900', '#F47365',
                                '#FFB243', '#FFE623', '#6EFF2A', '#1BC7B1',
                                '#00BEFF', '#2E81FF', '#5D61FF', '#FF89CF',
                                '#FC3CAD', '#BF3DCE', '#8E00A7', '#3b4351']"
            />
          </template>
        </editor-button>

        <span v-if="isExtended" class="span"></span>

        <editor-button
          v-if="isExtended"
          name="Заголовок"
          :active="isActive.heading()"
          :floats="menuBarFloats"
          :dropdown="true"
        >
          <span class="icon-font-size"></span>
          <template v-slot:dropdown>
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
          </template>
        </editor-button>

        <editor-button
          v-if="isExtended"
          name="Выравнивание по левому краю"
          :active="isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'left'"
          @command="commands.alignment({ textAlign: 'left' })"
          :floats="menuBarFloats"
        >
          <span class="icon-paragraph-left"></span>
        </editor-button>
        <editor-button
          v-if="isExtended"
          name="Выравнивание по центру"
          :active="isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'center'"
          @command="commands.alignment({ textAlign: 'center' })"
          :floats="menuBarFloats"
        >
          <span class="icon-paragraph-center"></span>
        </editor-button>
        <editor-button
          v-if="isExtended"
          name="Выравнивание по правому краю"
          :active="isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'right'"
          @command="commands.alignment({ textAlign: 'right' })"
          :floats="menuBarFloats"
        >
          <span class="icon-paragraph-right"></span>
        </editor-button>
        <editor-button
          v-if="isExtended"
          name="Выравнивание по ширине"
          :active="isActive.alignment() && editor.activeMarkAttrs.alignment.textAlign === 'justify'"
          @command="commands.alignment({ textAlign: 'justify' })"
          :floats="menuBarFloats"
        >
          <span class="icon-paragraph-justify"></span>
        </editor-button>

        <span class="span"></span>

        <editor-button
          name="Список"
          :active="isActive.bullet_list()"
          @command="commands.bullet_list"
          :floats="menuBarFloats"
        >
          <span class="icon-list2"></span>
        </editor-button>
        <editor-button
          name="Нумерованный список"
          :active="isActive.ordered_list()"
          @command="commands.ordered_list"
          :floats="menuBarFloats"
        >
          <span class="icon-list-numbered"></span>
        </editor-button>

        <span class="span"></span>

        <editor-button
          name="Цитата"
          :active="isActive.blockquote()"
          @command="commands.blockquote"
          :floats="menuBarFloats"
        >
          <span class="icon-quotes-right"></span>
        </editor-button>
        <editor-button
          name="Код"
          :active="isActive.code()"
          @command="commands.code"
          :floats="menuBarFloats"
        >
          <span class="icon-embed"></span>
        </editor-button>
        <editor-button
          name="Блок кода"
          :active="isActive.code_block()"
          @command="commands.code_block"
          :floats="menuBarFloats"
        >
          <span class="icon-embed2"></span>
        </editor-button>

        <editor-button
          name="Изображение"
          :active="isActive.image()"
          @command="imageModal.show = true"
          :floats="menuBarFloats"
        >
          <span class="icon-image"></span>
        </editor-button>

        <modal
          :open="imageModal.show"
          :closed="imageModalClose"
          title="Вставить изображение"
          @ok="chooseImage(commands.image)"
        >
          <tabs>
            <tab title="По ссылке">
              <div :class="['form-group', {'has-error': imageModal.urlError}, 'mt-2']">
                <input
                  class="form-input"
                  type="url"
                  placeholder="Ссылка на изображение"
                  v-model="imageModal.url"
                  autofocus
                />
                <p v-if="imageModal.urlError" class="form-input-hint">Введите ссылку на изображение</p>
              </div>
            </tab>
            <tab title="Загрузить">
              <image-upload
                @complete="imageUploaded($event, commands.image)"
                :multiple="true"
                class="mt-2"
              />
            </tab>
            <tab title="История загрузок">
              <div class="columns mt-2">
                <div
                  v-for="item in myFiles.slice((page - 1) * 20, 20 * page)"
                  :key="item.id"
                  class="column col-3"
                >
                  <a
                    href="#"
                    @click.prevent="commands.image({ src: getUrlById(item.id) }); imageModal.show = false"
                  >
                    <img :src="getUrlById(item.id)" width="100%" height="auto" />
                  </a>
                </div>
              </div>
              <pagination-view
                :page="page"
                :page-count="pageCount"
                @paginate-relative="paginateRelative"
                @paginate-to="paginateTo"
              ></pagination-view>
            </tab>
          </tabs>
        </modal>

        <editor-button
          name="Embed (youtube, etc)"
          :active="isActive.iframe()"
          @command="embedModal.show = true"
          :floats="menuBarFloats"
        >
          <span class="icon-new-tab"></span>
        </editor-button>

        <modal
          :open="embedModal.show"
          :closed="embedModalClose"
          title="Embed"
          @ok="chooseEmbed(commands.iframe)"
        >
          <input
            class="form-input"
            type="url"
            placeholder="Ссылка (YouTube, Vimeo, Soundcloud, Twitch)"
            v-model="embedModal.url"
            autofocus
          />
        </modal>

        <span v-if="isExtended" class="span"></span>

        <editor-button
          v-if="isExtended"
          name="Горизонтальная линия"
          @command="commands.horizontal_rule"
          :floats="menuBarFloats"
        >
          <span class="icon-page-break"></span>
        </editor-button>

        <span v-if="isExtended" class="span"></span>

        <editor-button
          v-if="isExtended"
          name="Таблица"
          :active="isActive.table()"
          @command="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          :floats="menuBarFloats"
        >
          <span class="icon-table2"></span>
        </editor-button>

        <span class="span"></span>

        <editor-button name="Помощь" @command="showHelp = true" :floats="menuBarFloats">?</editor-button>

        <modal
          :open="showHelp"
          :closed="closeHelp"
          title="Помощь по редактору текста"
          size="lg"
          :hideButtons="true"
        >
          <h4>Общее</h4>
          <p>
            Для добавления переноса на новую строку используйте
            <kbd>Ctrl/Shift+Return</kbd>
          </p>
          <p>Редактор поддерживает некоторые правила Markdown</p>
          <p>
            Для пропорционального масштабирования изображения зажмите
            <kbd>Shift</kbd>
          </p>
          <h4>Embed</h4>
          <p>Поддерживаемые сервисы: YouTube, Vimeo, Soundcloud, Twitch, Twitter</p>
        </modal>

        <div v-if="isActive.code_block()">
          <small>Для выхода из режима редактирования кода нажмите Ctrl/Shift+Return</small>
        </div>

        <div v-if="isExtended && isActive.table()" class="mt-1">
          <small>Редактировать таблицу</small>

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
          <button class="button" @click="commands.deleteColumn">удалить колонку</button>
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
          <button class="button" @click="commands.deleteRow">удалить строку</button>
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
    <small
      v-if="limit > 0"
      style="position:absolute;bottom:-18px;right:4px"
    >{{ store.length }} / {{ limit }}</small>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/models/pagination'

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
import { ImageExtended } from '@/editor/node/ImageExtended'
import EditorButton from '@/components/editor/EditorButton.vue'
import Tabs from '@/components/elements/Tabs.vue'
import Tab from '@/components/elements/Tab.vue'
import PaginationView from '@/components/PaginationView.vue'
import Stickers from '@/editor/node/Stickers'

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
      default () {
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
  data () {
    return {
      editor: null,
      imageModal: {
        show: false,
        url: '',
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
      showHelp: false,
      page: 1,
      pageCount: 1
    }
  },
  mounted () {
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
        new ImageExtended(),
        new CBExtended(),
        new Iframe(),
        new Stickers({
          items: () => [
            { id: 1, name: 'Philipp Kühn' },
            { id: 2, name: 'Hans Pagel' },
            { id: 3, name: 'Kris Siepert' },
            { id: 4, name: 'Justin Schueler' }
          ]
        })
      ],
      onFocus () {
        self.isFocused = true
      },
      onBlur () {
        self.isFocused = false
      },
      onUpdate (state) {
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

    window.addEventListener('keydown', this.onKeyDown)
    if (this.isExtended)
      window.addEventListener('scroll', this.onScroll)

    this.refreshMyFiles(1)

    window.addEventListener('beforeunload', () => {
      this.saveContentsToStorage()
    })
  },
  beforeDestroy () {
    this.saveContentsToStorage()

    if (this.editor)
      this.editor.destroy()

    window.removeEventListener('keydown', this.onKeyDown)
    if (this.isExtended)
      window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    imageModalClose () {
      this.imageModal.show = false
      this.imageModal.urlError = false
    },
    setContent (body) {
      this.editor.setContent(body)
      this.store.html = this.editor.getHTML()
      this.store.text = this.editor.state.doc.textContent
      this.store.length = this.store.text.length
    },
    chooseImage (command) {
      if (this.imageModal.url.length > 0) {
        command({ src: this.imageModal.url })
        this.imageModal.url = ''
        this.imageModalClose()
      } else {
        this.imageModal.urlError = true
      }
    },
    imageUploaded (images, command) {
      images.forEach(i => {
        command({ src: process.env.VUE_APP_CONTENT_URL + `/${i.id}` })
      })

      this.imageModal.show = false
    },
    chooseEmbed (command) {
      if (this.embedModal.url.length > 0) {
        command({ src: this.embedModal.url })
        this.embedModal.url = ''
        this.embedModal.show = false
      }
    },
    embedModalClose () {
      this.embedModal.show = false
    },
    colorChanged (color, command) {
      this.color = color.rgba.toHexString()

      let { rgba: { r, g, b } } = color
      command({ color: `rgb(${r}, ${g}, ${b})` })
    },
    onKeyDown (e) {
      if (e.keyCode === 9 && // TAB
        this.isFocused &&
        this.editor.isActive.code_block()) {
        e.preventDefault()
      }
    },
    onScroll (e) {
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
    closeHelp () {
      this.showHelp = false
    },
    storageValue () {
      if (this.storageType === 'local') {
        return localStorage.getItem(this.storageKey)
      } else {
        return sessionStorage.getItem(this.storageKey)
      }
    },
    paginateRelative (offset) {
      this.page += offset

      this.refreshMyFiles(this.page)
    },
    paginateTo (offset) {
      this.page = offset

      this.refreshMyFiles(this.page)
    },
    refreshMyFiles (page) {
      this.$store.dispatch('content/getOwned', {pagination: new Pagination(page)})
        .then(pages => {
          this.pageCount = pages
        }).catch(err => {
          console.log(err)
        })
    },
    saveContentsToStorage () {
      if (!this.storageKey)
        return

      if (this.storageType === 'session') {
        sessionStorage.setItem(this.storageKey, this.store.html)
      } else {
        localStorage.setItem(this.storageKey, this.store.html)
      }
    },
    getUrlById (id) {
      return this.$store.dispatch('content/getUrlById', { id: id })
    }
  },
  computed: {
    ...mapState({
      myFiles: state => state.content.my
    }),
    isBasic () {
      return this.type !== 'extended'
    },
    isExtended () {
      return this.type === 'extended'
    }
  },
  components: {
    EditorContent,
    EditorMenuBar,
    EditorButton,
    Modal,
    ColorPicker,
    ImageUpload,
    Tabs,
    Tab,
    PaginationView
  }
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

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
</style>

<style>
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
