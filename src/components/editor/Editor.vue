<template>
  <div>    
    <editor-menu-bar
      class="menu-bar"
      :class="{ 'floating': isMenuBarFloating }"
      :style="[{ 'left': menuBarOffsetLeft }, { 'width': menuBarWidth }]"
      :editor="editor"
      v-slot="{ commands, isActive }"
    >
      <div>
        <editor-menu
          :activeButtons="activeButtons"
          :activeHeading="isActive.heading"
          @bold="commands.bold"
          @italic="commands.italic"
          @strike="commands.strike"
          @underline="commands.underline"
          @mono="commands.code"
          @heading="commands.heading"
          @paragraph="commands.paragraph"
          @quote="commands.blockquote"
          @codeblock="commands.code_block"
          @bulletlist="commands.bullet_list"
          @orderedlist="commands.ordered_list"
          @image="showImageModal"
          @embed="showEmbedModal"
          @table="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })"
          @removeTable="commands.deleteTable"
          @insertColumnBefore="commands.addColumnBefore"
          @insertColumnAfter="commands.addColumnAfter"
          @removeColumn="commands.deleteColumn"
          @insertRowBefore="commands.addRowBefore"
          @insertRowAfter="commands.addRowAfter"
          @removeRow="commands.deleteRow"
          @mergeCells="commands.toggleCellMerge"
        />

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
      </div>
    </editor-menu-bar>

    <div class="editor form-input" ref="editorWrapper">
      <editor-content class="editor-content" :editor="editor"></editor-content>
    </div>

    <sticker-list 
      v-show="showStickers" 
      :stickers="filteredStickers" 
      :sticker-index="navigatedStickerIndex"
      @select-sticker="selectSticker"
      ref="stickers"
    />
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

import Modal from '@/components/elements/Modal.vue'
import Tabs from '@/components/elements/Tabs.vue'
import Tab from '@/components/elements/Tab.vue'
import PaginationView from '@/components/PaginationView.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import StickerList from '@/components/editor/StickerList.vue'
import EditorMenu from '@/components/editor/EditorMenu.vue'

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
      menuBarWidth: 'auto',

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
      //   this.editor.isActive.code_block()) {
      //   e.preventDefault()
      // }
    },
    onScroll () {
      let wrapper = this.$refs.editorWrapper
      let scroll = window.pageYOffset || document.documentElement.scrollTop
      let clientRect = wrapper.getBoundingClientRect()

      if (scroll > clientRect.top + scroll) {
        this.menuBarOffsetLeft = clientRect.left + 1 + 'px'
        this.menuBarWidth = clientRect.width - 2 + 'px'
        this.isMenuBarFloating = true
      } else {
        this.isMenuBarFloating = false
        this.menuBarWidth = 'auto'
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

      this.popup = new Popper(node, this.$refs.stickers.$el, {
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
    },
    activeButtons() {
      return {
        bold: this.editor.isActive.bold(),
        italic: this.editor.isActive.italic(),
        strike: this.editor.isActive.strike(),
        underline: this.editor.isActive.underline(),
        mono: this.editor.isActive.code(),
        paragraph: this.editor.isActive.paragraph(),
        quote: this.editor.isActive.blockquote(),
        codeblock: this.editor.isActive.code_block(),
        bulletlist: this.editor.isActive.bullet_list(),
        orderedlist: this.editor.isActive.ordered_list(),
        image: this.editor.isActive.image(),
        embed: this.editor.isActive.iframe(),
        table: this.editor.isActive.table(),
      }
    }
  },
  components: {
    EditorMenuBar,
    EditorContent,
    Modal,
    Tabs,
    Tab,
    PaginationView,
    ImageUpload,
    StickerList,
    EditorMenu,
  },
}
</script>

<style>
.editor {
  height: auto;
}

.editor .ProseMirror:focus {
  outline: none;
}
</style>

<style lang="scss" scoped>
@import "./node_modules/spectre.css/src/_variables.scss";

.menu-bar.floating {
  position: fixed;
  left: 0;
  top: 0;
  z-index: $zindex-1;
  background: $bg-color-light;
  border-bottom: 1px solid $border-color;
}

.editor:focus-within {
  border-color: $primary-color;
}
</style>
