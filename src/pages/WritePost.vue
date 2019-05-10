<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div class="column">
        
        <h2>Новая запись</h2>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="title">Название</label>
            </div>
            <div class="col-9 col-sm-12">
              <input class="form-input" type="text" id="title" v-model="model.title">
              <p class="form-input-hint">/posts/{{ slug }}</p>
            </div>
          </div>

          <div class="form-group">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
              <div class="menu-bar">
                <button :class="[{ 'is-active': isActive.bold() }, 'button', 'tooltip']" @click="commands.bold" data-tooltip="Жирный">
                  <span class="icon-bold"></span>
                </button>
                <button :class="[{ 'is-active': isActive.italic() }, 'button', 'tooltip']" @click="commands.italic" data-tooltip="Наклонный">
                  <span class="icon-italic"></span>
                </button>
                <button :class="[{ 'is-active': isActive.underline() }, 'button', 'tooltip']" @click="commands.underline" data-tooltip="Подчёркнутый">
                  <span class="icon-underline"></span>
                </button>
                <button :class="[{ 'is-active': isActive.strike() }, 'button', 'tooltip']" @click="commands.strike" data-tooltip="Зачёркнутый">
                  <span class="icon-strikethrough"></span>
                </button>
                <button :class="[{ 'is-active': isActive.paragraph() }, 'button', 'tooltip']" @click="commands.paragraph" data-tooltip="Параграф">
                  <span class="icon-pilcrow"></span>
                </button>

                <span class="span"></span>

                <div class="dropdown-container">
                  <button :class="[{ 'is-active': isActive.heading({ level: 1 }) ||
                                                  isActive.heading({ level: 2 }) || 
                                                  isActive.heading({ level: 3 }) ||
                                                  showDropdown }, 'button', 'tooltip']"
                          data-tooltip="Заголовок"
                          @click="showDropdown = !showDropdown"
                  >
                    <span class="icon-font-size"></span>
                  </button>
                  <div class="dropdown" v-if="showDropdown">
                    <button :class="[{ 'is-active': isActive.heading({ level: 1 }) }, 'button']" @click="commands.heading({ level: 1 }); showDropdown = false"><h1>Заголовок 1</h1></button>
                    <button :class="[{ 'is-active': isActive.heading({ level: 2 }) }, 'button']" @click="commands.heading({ level: 2 }); showDropdown = false"><h2>Заголовок 2</h2></button>
                    <button :class="[{ 'is-active': isActive.heading({ level: 3 }) }, 'button']" @click="commands.heading({ level: 3 }); showDropdown = false"><h3>Заголовок 3</h3></button>
                  </div>
                </div>

                <button :class="[{ 'is-active': false }, 'button', 'tooltip']" data-tooltip="Выравнивание по левому краю">
                  <span class="icon-paragraph-left"></span>
                </button>
                <button :class="[{ 'is-active': false }, 'button', 'tooltip']" data-tooltip="Выравнивание по центру">
                  <span class="icon-paragraph-center"></span>
                </button>
                <button :class="[{ 'is-active': false }, 'button', 'tooltip']" data-tooltip="Выравнивание по правому краю">
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
                <button :class="['button', 'tooltip']" @click="showImageModal = true" data-tooltip="Изображение">
                  <span class="icon-image"></span>
                </button>

                <modal :open="showImageModal" :closed="imageModalClose" title="Вставьте ссылку на изображение" @ok="chooseImage(commands.image)">
                  <input class="form-input" type="url" placeholder="Ссылка на изображение" v-model="model.imageUrl">
                </modal>

                <span class="span"></span>

                <button :class="['button', 'tooltip']" @click="commands.horizontal_rule" data-tooltip="Горизонтальная линия">
                  <span class="icon-minus"></span>
                </button>

                <span class="span"></span>

                <button :class="[{'is-active': isActive.table()}, 'button', 'tooltip']" @click="commands.createTable({rowsCount: 3, colsCount: 3, withHeaderRow: false })" data-tooltip="Таблица">
                  <span class="icon-table2"></span>
                </button>

                <span v-if="isActive.table()">
                  <button
                    class="menubar__button"
                    @click="commands.deleteTable"
                  >
                    удалить
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.addColumnBefore"
                  >
                    колонка перед
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.addColumnAfter"
                  >
                    колонка после
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.deleteColumn"
                  >
                    удалить колонку
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.addRowBefore"
                  >
                    строка перед
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.addRowAfter"
                  >
                    строка после
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.deleteRow"
                  >
                    удалить строку
                  </button>
                  <button
                    class="menubar__button"
                    @click="commands.toggleCellMerge"
                  >
                    объеденить ячецки
                  </button>
                </span>

              </div>
            </editor-menu-bar>
            <div class="form-input post-editor">
              <editor-content :editor="editor"></editor-content>
            </div>
          </div>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="blog">В блог</label>
            </div>
            <div class="col-9 col-sm-12">
              <select class="form-select" id="blog" v-model="model.blog">
                <option :value="null" selected>Нет</option>
                <option v-for="blog in blogs" :key="blog.id" :value="blog.id">{{ blog.title }}</option>
              </select>
            </div>
          </div>

          <div class="form-group float-right">
            <div class="btn-group btn-group-block" style="width:350px">
              <input type="submit" class="btn" value="Сохранить как черновик" @click="send(true)">
              <input type="submit" class="btn btn-primary" value="Написать" @click="send(false)" :disabled="model.blog == null || model.title.length < 3">
            </div>
          </div>

        </div>

      </div>
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
import UserService from '@/services/user'
import PostService from '@/services/post'
import getSlug from 'speakingurl'
import Modal from '@/components/elements/modal'

export default {
  data() {
    return {
      ...this.mapData({
        meta: 'meta/data/user',
        blogs: 'userBlogs/everything'
      }),
      editor: null,
      model: {
        title: '',
        blog: null,
        imageUrl: ''
      },
      showDropdown: false,
      showImageModal: false
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        new Bold(),
        new Italic(),
        new Link(),
        new Underline(),
        new Strike(),
        new Blockquote(),
        new Code(),
        new CodeBlock(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new History(),
        new Heading({ levels: [1, 2, 3] }),
        new HorizontalRule(),
        new Image(),
        new Table(),
        new TableHeader(),
        new TableCell(),
        new TableRow()
      ]
    })
  },
  methods: {
    imageModalClose() {
      this.showImageModal = false
    },
    chooseImage(command) {
      if (this.model.imageUrl.length > 0) {
        command({ src: this.model.imageUrl })
        this.model.imageUrl = ''
      }
      this.showImageModal = false
    },
    send(draft) {
      PostService.createPost(this.model.title, this.editor.getHTML(), draft, this.model.blog).then(data => {
        console.log(data)
      })
    }
  },
  computed: {
    slug() {
      return getSlug(this.model.title, { lang: 'ru' })
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
.post-editor {
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

<style>
.post-editor .ProseMirror {
  min-height: 300px;
}

.post-editor .ProseMirror:focus {
  outline: none;
}

.post-editor:focus-within {
  border-color: blueviolet;
}
</style>
