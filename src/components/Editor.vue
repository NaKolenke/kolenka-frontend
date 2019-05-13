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

        <span v-if="isExtended" class="span"></span>

        <div v-if="isExtended" class="dropdown-container">
          <button :class="[{ 'is-active': isActive.heading() ||
                                          showDropdown }, 'button', 'tooltip']"
                  data-tooltip="Заголовок"
                  @click="showDropdown = !showDropdown"
          >
            <span class="icon-font-size"></span>
          </button>
          <div class="dropdown" v-if="showDropdown">
            <button 
              v-for="i in (1, 6)"
              :key="i"
              :class="[{ 'is-active': isActive.heading({ level: i }) }, 'button']"
              @click="commands.heading({ level: i }); showDropdown = false"
            >
              <h1 v-if="i == 1">Заголовок {{ i }}</h1>
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
              <div class="input-group">
                <input class="form-input" type="file" name="file">
                <button class="btn input-group-btn" @click="uploadImage()">Загрузить</button>
              </div>
              <p v-if="imageUploadError" class="form-input-hint">{{ imageUploadError }}</p>
            </form>
          </div>
        </modal>

        <span v-if="isExtended" class="span"></span>

        <button v-if="isExtended" :class="['button', 'tooltip']" @click="commands.horizontal_rule" data-tooltip="Горизонтальная линия">
          <span class="icon-minus"></span>
        </button>

        <span v-if="isExtended" class="span"></span>

        <button v-if="isExtended" :class="[{'is-active': isActive.table()}, 'button', 'tooltip']" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })" data-tooltip="Таблица">
          <span class="icon-table2"></span>
        </button>

        <div v-if="isExtended && isActive.table()">
          <small>Редактировать таблицу </small>
          
          <button
            class="button"
            @click="commands.deleteTable"
          >
            удалить таблицу
          </button>
          <button
            class="button"
            @click="commands.addColumnBefore"
          >
            колонка перед
          </button>
          <button
            class="button"
            @click="commands.addColumnAfter"
          >
            колонка после
          </button>
          <button
            class="button"
            @click="commands.deleteColumn"
          >
            удалить колонку
          </button>
          <button
            class="button"
            @click="commands.addRowBefore"
          >
            строка перед
          </button>
          <button
            class="button"
            @click="commands.addRowAfter"
          >
            строка после
          </button>
          <button
            class="button"
            @click="commands.deleteRow"
          >
            удалить строку
          </button>
          <button
            class="button"
            @click="commands.toggleCellMerge"
          >
            объеденить ячецки
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
  TodoItem,
  TodoList,
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
  TableRow,
} from 'tiptap-extensions'
import Modal from '@/components/elements/modal'
import Alignment from '@/editor/mark/Align'
import ContentService from '@/services/content'

export default {
  props: [ 'type', 'editorClass' ], // basic, extended
  data() {
    return {
      editor: null,
      showDropdown: false,
      showImageModal: false,
      imageUrl: '',
      imageModalTab: 0,
      imageUrlError: false,
      imageUploadError: null
    }
  },
  mounted() {
    const options = {
      extensions: [
        new Bold(),
        new Italic(),
        new Link(),
        new Underline(),
        new Strike(),

        new ListItem(),
        new BulletList(),
        new OrderedList(),

        new Blockquote(),
        new Code(),
        new CodeBlock(),
        new Image()
      ]
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
    uploadImage() {
      this.imageUploadError = null
      ContentService.uploadFile(new FormData(this.$refs.image)).then(data => {
        this.imageUrl = 'https://beta.kolenka.net/content/' + data.file.id
        this.imageModalTab = 0
      }).catch(err => {
        this.imageUploadError = err
      })
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
    Modal
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

.dropdown-container {
  display: inline;
  position: relative;
  overflow: visible;
}

.dropdown {
  position: absolute;
  left: 0;
  top: 24px;
  width: 250px;
  height: auto;
  background: #fff;
  z-index: 99;
  border: .05rem solid #bcc3ce;
  border-radius: .1rem;
}

.dropdown .button {
  border-radius: 0;
  width: 100%;
  text-align: left;
}
</style>
