<template>
  <div>
    <editor-menu-bar
      class="menu-bar"
      :class="{ 'floating': isMenuBarFloating && !disableFloatingMenu }"
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
          @link="showLinkModal"
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
          @help="showHelpModal"
        />

        <insert-image-modal :isShowed.sync="isImageModalShowed" :command="commands.image" />

        <insert-embed-modal :isShowed.sync="isEmbedModalShowed" :command="commands.iframe" />

        <link-modal :isShowed.sync="isLinkModalShowed" :command="commands.link" :editor="editor" />

        <help-modal :isShowed.sync="isHelpModalShowed" />
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
  Strike,
  Underline,
  History,
  Image,
  Table,
  TableHeader,
  TableCell,
  TableRow} from 'tiptap-extensions'
import Popper from "popper.js";
import BetterLink from '@/components/editor/mark/BetterLink'
import Iframe from '@/components/editor/node/iframe'
import StickerNode from '@/components/editor/node/Stickers'
import SpoilerNode from '@/components/editor/node/spoiler'
import CutNode from '@/components/editor/node/cut'

import StickerList from '@/components/editor/StickerList.vue'
import EditorMenu from '@/components/editor/EditorMenu.vue'

import HelpModal from '@/components/editor/modals/HelpModal.vue'
import InsertImageModal from '@/components/editor/modals/InsertImageModal.vue'
import InsertEmbedModal from '@/components/editor/modals/InsertEmbedModal.vue'
import LinkModal from '@/components/editor/modals/LinkModal.vue'

import { mapState } from 'vuex'

export default {
  props: {
    disableFloatingMenu: Boolean
  },
  data () {
    return {
      editor: new Editor({
        content: '',
        extensions: [
          new History(),
          new Bold(),
          new Italic(),
          new BetterLink({ openOnClick: false }),
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
          new SpoilerNode(),
          new CutNode()
        ],
      }),
      isMenuBarFloating: false,
      menuBarOffsetLeft: 0,
      menuBarWidth: 'auto',

      isHelpModalShowed: false,
      isImageModalShowed: false,
      isEmbedModalShowed: false,
      isLinkModalShowed: false,

      navigatedStickerIndex: 0,
      stickerQuery: null,
      filteredStickers: [],
      suggestionRange: null,
    }
  },
  mounted () {
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
    showLinkModal () {

      this.isLinkModalShowed = true
    },
    closeLinkModal () {
      this.isLinkModalShowed = false
    },
    refreshStickers () {
      this.$store.dispatch('stickers/getAll')
    },
    onKeyDown (_e) {
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
      stickers: state => state.stickers.available
    }),
    showStickers () {
      return !!this.stickerQuery
    },
    hasStickersResults () {
      return this.filteredStickers.length != 0
    },
    activeButtons () {
      return {
        bold: this.editor.isActive.bold(),
        italic: this.editor.isActive.italic(),
        strike: this.editor.isActive.strike(),
        underline: this.editor.isActive.underline(),
        mono: this.editor.isActive.code(),
        link: this.editor.isActive.link(),
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
    StickerList,
    EditorMenu,
    HelpModal,
    InsertImageModal,
    InsertEmbedModal,
    LinkModal
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
