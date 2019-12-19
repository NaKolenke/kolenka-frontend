<template>
  <div>
    <editor-menu-bar
      :class="{ 'floating': isMenuBarFloating }"
      :style="[{ 'left': menuBarOffsetLeft }]"
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div class="menu-bar">
        <span id="format">
          <editor-button name="Жирный" :active="isActive.bold()" @command="commands.bold">
            <span class="icon-bold"></span>
          </editor-button>

          <editor-button name="Наклонный" :active="isActive.italic()" @command="commands.italic">
            <span class="icon-italic"></span>
          </editor-button>

          <editor-button name="Зачёркнутый" :active="isActive.strike()" @command="commands.strike">
            <span class="icon-strikethrough"></span>
          </editor-button>

          <editor-button
            name="Подчёркнутый"
            :active="isActive.underline()"
            @command="commands.underline"
          >
            <span class="icon-underline"></span>
          </editor-button>

          <editor-button name="Код" :active="isActive.code()" @command="commands.code">
            <span class="icon-embed"></span>
          </editor-button>
        </span>

        <span class="span"></span>

        <span id="block-format">
          <editor-button
            name="Заголовок"
            :active="isActive.heading({ level: 1 }) "
            @command="commands.heading({ level: 1 })"
          >
            <span class="icon-font-size"></span>
          </editor-button>

          <editor-button
            name="Подзаголовок"
            :active="isActive.heading({ level: 2 })"
            @command="commands.heading({ level: 2 })"
          >
            <span class="icon-font-size" style="font-size: 0.7em;"></span>
          </editor-button>

          <editor-button
            name="Параграф"
            :active="isActive.paragraph()"
            @command="commands.paragraph"
          >
            <span class="icon-pilcrow"></span>
          </editor-button>

          <editor-button
            name="Цитата"
            :active="isActive.blockquote()"
            @command="commands.blockquote"
          >
            <span class="icon-quotes-right"></span>
          </editor-button>

          <editor-button
            name="Блок кода"
            :active="isActive.code_block()"
            @command="commands.code_block"
          >
            <span class="icon-embed2"></span>
          </editor-button>
        </span>

        <span class="span"></span>

        <span id="lists">
          <editor-button
            name="Список"
            :active="isActive.bullet_list()"
            @command="commands.bullet_list"
          >
            <span class="icon-list2"></span>
          </editor-button>
          <editor-button
            name="Нумерованный список"
            :active="isActive.ordered_list()"
            @command="commands.ordered_list"
          >
            <span class="icon-list-numbered"></span>
          </editor-button>
        </span>

        <span class="span"></span>

        <span id="embed">
          <editor-button name="Изображение" :active="isActive.image()" @command="showImageModal">
            <span class="icon-image"></span>
          </editor-button>

          <modal
            :open="isImageModalShowed"
            :closed="closeImageModal"
            title="Вставить изображение"
            @ok="chooseImage(commands.image)"
          >
            <tabs>
              <tab title="По ссылке">
                <div :class="['form-group', {'has-error': imageModalError}, 'mt-2']">
                  <input
                    class="form-input"
                    type="url"
                    placeholder="Ссылка на изображение"
                    v-model="imageModalUrl"
                    autofocus
                  />
                  <p v-if="imageModalError" class="form-input-hint">Введите ссылку на изображение</p>
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
                    v-for="item in myFiles.slice((imageContentPage - 1) * 20, 20 * imageContentPage)"
                    :key="item.id"
                    class="column col-3"
                  >
                    <a
                      href="#"
                      @click.prevent="commands.image({ src: getUrlById(item.id) }); closeImageModal()"
                    >
                      <img :src="getUrlById(item.id)" width="100%" height="auto" />
                    </a>
                  </div>
                </div>
                <pagination-view
                  :page="imageContentPage"
                  :page-count="imageContentPageCount"
                  @paginate-relative="paginateRelative"
                  @paginate-to="paginateTo"
                ></pagination-view>
              </tab>
            </tabs>
          </modal>

          <editor-button
            name="Embed (youtube, etc)"
            :active="isActive.iframe()"
            @command="showEmbedModal"
          >
            <span class="icon-new-tab"></span>
          </editor-button>

          <modal
            :open="isEmbedModalShowed"
            :closed="closeEmbedModal"
            title="Embed"
            @ok="chooseEmbed(commands.iframe)"
          >
            <input
              class="form-input"
              type="url"
              placeholder="Ссылка (YouTube, Vimeo, Soundcloud, Twitch)"
              v-model="embedModalUrl"
              autofocus
            />
          </modal>
        </span>

        <span class="span"></span>

        <span id="tables">
          <editor-button
            name="Таблица"
            :active="isActive.table()"
            @command="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          >
            <span class="icon-table2"></span>
          </editor-button>
        </span>

        <span class="span"></span>

        <span id="help">
          <editor-button name="Помощь" @command="showHelpModal">?</editor-button>

          <modal
            :open="isHelpModalShowed"
            :closed="closeHelpModal"
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
        </span>

        <div v-if="isActive.table()" class="mt-1">
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

    <div :class="['editor', 'form-input']" ref="editorWrapper">
      <editor-content class="editor-content" :editor="editor"></editor-content>
    </div>

    <div class="stickers-list" v-show="showStickers" ref="stickers">
      <template v-if="hasStickersResults">
        <div
          v-for="(sticker, index) in filteredStickers"
          :key="sticker.id"
          class="stickers-list__item"
          :class="{ 'is-selected': navigatedStickerIndex === index }"
          @click="selectSticker(sticker)"
        >
          <sticker :name="sticker.name" />
          {{ sticker.name }}
        </div>
      </template>
      <div v-else class="stickers-list__item is-empty">Нет подходящих стикеров</div>
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
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow} from 'tiptap-extensions'
import Popper from "popper.js";
import Iframe from '@/components/editor/node/iframe'
import StickerNode from '@/components/editor/node/Stickers'

import EditorButton from '@/components/editor/EditorButton.vue'
import Modal from '@/components/elements/Modal.vue'
import Tabs from '@/components/elements/Tabs.vue'
import Tab from '@/components/elements/Tab.vue'
import PaginationView from '@/components/PaginationView.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import Sticker from '@/components/elements/Sticker.vue'

import { mapState } from 'vuex'
import errors from '@/utils/errors'
import Pagination from '@/models/pagination'

export default {
  data () {
    return {
      editor: new Editor({
        content: '',
        extensions: [
          new History(),
          new Bold(),
          new Italic(),
          new Link(),
          new Underline(),
          new Strike(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3], }),
          new Bold(),

          new ListItem(),
          new BulletList(),
          new OrderedList(),

          new Blockquote(),
          new Code(),
          new CodeBlock(),
          new Image(),
          // new ImageExtended(),
          // new CBExtended(),
          new Iframe(),
          new Table({
            resizable: true,
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow(),
          new StickerNode({
            items: this.getStickers,
            // is called when a suggestion starts
            onEnter: ({
              items, query, range, command, virtualNode,
            }) => {
              this.stickerQuery = query
              this.filteredStickers = items
              this.suggestionRange = range
              this.renderPopup(virtualNode)
              this.insertSticker = command
            },
            // is called when a suggestion has changed
            onChange: ({
              items, query, range, virtualNode,
            }) => {
              this.stickerQuery = query
              this.filteredStickers = items
              this.suggestionRange = range
              this.navigatedStickerIndex = 0
              this.renderPopup(virtualNode)
            },
            // is called when a suggestion is cancelled
            onExit: () => {
              this.stickerQuery = null
              this.filteredStickers = []
              this.suggestionRange = null
              this.navigatedStickerIndex = 0
              this.destroyPopup()
            },
            onKeyDown: ({ event }) => {
              // pressing up arrow
              if (event.keyCode === 38) {
                this.upHandler()
                event.preventDefault()
                return true
              }
              // pressing down arrow
              if (event.keyCode === 40) {
                this.downHandler()
                return true
              }
              // pressing enter
              if (event.keyCode === 13) {
                this.enterHandler()
                return true
              }
              return false
            },
            // is called when a suggestion has changed
            // this function is optional because there is basic filtering built-in
            // you can overwrite it if you prefer your own filtering
            // in this example we use fuse.js with support for fuzzy search
            onFilter: (items, query) => {
              if (!query) {
                return items
              }
              return items.filter(s => s.name.includes(query))
            },
          }),
        ],
      }),
      isMenuBarFloating: false,
      menuBarOffsetLeft: 0,

      isHelpModalShowed: false,

      isImageModalShowed: false,
      imageModalUrl: null,
      imageModalError: null,
      imageContentPage: 1,
      imageContentPageCount: 1,

      isEmbedModalShowed: false,
      embedModalUrl: null,

      navigatedStickerIndex: 0,
      stickerQuery: null,
      filteredStickers: [],
      suggestionRange: null,
    }
  },
  mounted () {
    this.refreshMyFiles(1)
    this.refreshStickers()

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    this.editor.destroy()

    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    setContent (body) {
      this.editor.setContent(body)
    },
    getHtml () {
      return this.editor.getHTML()
    },
    showHelpModal () {
      this.isHelpModalShowed = true
    },
    closeHelpModal () {
      this.isHelpModalShowed = false
    },
    showImageModal () {
      this.isImageModalShowed = true
    },
    closeImageModal () {
      this.isImageModalShowed = false
    },
    showEmbedModal () {
      this.isEmbedModalShowed = true
    },
    closeEmbedModal () {
      this.isEmbedModalShowed = false
    },
    chooseImage (command) {
      if (this.imageModal.url.length > 0) {
        command({ src: this.imageModal.url })
        this.imageModal.url = ''
        this.closeImageModal()
      } else {
        this.imageModalError = true
      }
    },
    imageUploaded (images, command) {
      images.forEach(i => {
        command({ src: process.env.VUE_APP_CONTENT_URL + `/${i.id}` })
      })

      this.closeImageModal()
    },
    chooseEmbed (command) {
      if (this.embedModalUrl.length > 0) {
        command({ src: this.embedModalUrl })
        this.embedModalUrl = ''
        this.closeEmbedModal()
      }
    },
    paginateRelative (offset) {
      this.imageContentPage += offset

      this.refreshMyFiles(this.imageContentPage)
    },
    paginateTo (offset) {
      this.imageContentPage = offset

      this.refreshMyFiles(this.imageContentPage)
    },
    refreshMyFiles (page) {
      this.$store.dispatch('content/getOwned', { pagination: new Pagination(page) })
        .then(res => {
          this.imageContentPageCount = res.meta.page_count
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    refreshStickers () {
      this.$store.dispatch('stickers/getAll')
    },
    getUrlById (id) {
      return `${process.env.VUE_APP_CONTENT_URL}/${id}/`
    },
    onKeyDown (e) {
      // if (e.keyCode === 9 && // TAB
      //   this.isFocused &&
      //   this.editor.isActive.code_block()) {
      //   e.preventDefault()
      // }
    },
    onScroll (_e) {
      let wrapper = this.$refs.editorWrapper
      let scroll = window.pageYOffset || document.documentElement.scrollTop
      let clientRect = wrapper.getBoundingClientRect()

      if (scroll > clientRect.top + scroll) {
        this.menuBarOffsetLeft = clientRect.left + 1 + 'px'
        this.isMenuBarFloating = true
      } else {
        this.isMenuBarFloating = false
      }
    },
    upHandler () {
      this.navigatedStickerIndex = ((this.navigatedStickerIndex + this.filteredStickers.length) - 1) % this.filteredStickers.length
    },
    downHandler () {
      this.navigatedStickerIndex = (this.navigatedStickerIndex + 1) % this.filteredStickers.length
    },
    enterHandler () {
      const sticker = this.filteredStickers[this.navigatedStickerIndex]
      if (sticker) {
        this.selectSticker(sticker)
      }
    },
    selectSticker (sticker) {
      this.insertSticker({
        range: this.suggestionRange,
        attrs: {
          label: sticker.name,
        },
      })
      this.editor.focus()
    },
    renderPopup (node) {
      if (this.popup) {
        return
      }

      this.popup = new Popper(node, this.$refs.stickers, {
        placement: 'bottom'
      });
    },
    destroyPopup () {
      if (this.popup) {
        this.popup.destroy()
        this.popup = null
      }
    },
    getStickers () {
      return this.stickers
    }
  },
  computed: {
    ...mapState({
      myFiles: state => state.content.my,
      stickers: state => state.stickers.available
    }),
    showStickers () {
      return !!this.stickerQuery
    },
    hasStickersResults () {
      return this.filteredStickers.length != 0
    }
  },
  components: {
    EditorMenuBar,
    EditorContent,
    EditorButton,
    Modal,
    Tabs,
    Tab,
    PaginationView,
    ImageUpload,
    Sticker,
  },
}
</script>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

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

.editor {
  height: auto;
}

.editor .ProseMirror {
  min-height: 300px;
}

.editor .ProseMirror:focus {
  outline: none;
}

.editor:focus-within {
  border-color: $primary-color;
}

.stickers-list {
  padding: 0.2rem;
  border: 2px solid $border-color;
  font-size: 0.8rem;
  font-weight: bold;
  background-color: rgba($bg-color-light, 0.9);

  &__no-results {
    padding: 0.2rem 0.5rem;
  }
  &__item {
    border-radius: 5px;
    padding: 0.2rem 0.5rem;
    margin-bottom: 0.2rem;
    cursor: pointer;
    &:last-child {
      margin-bottom: 0;
    }
    &.is-selected,
    &:hover {
      background-color: rgba($bg-color-dark, 0.9);
    }
    &.is-empty {
      opacity: 0.5;
    }
  }
}
</style>
