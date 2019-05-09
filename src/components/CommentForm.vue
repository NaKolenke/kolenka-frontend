<template>
  <div>
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

        <button :class="[{ 'is-active': isActive.bullet_list() }, 'button', 'tooltip']" @click="commands.bullet_list" data-tooltip="Список">
          <span class="icon-list2"></span>
        </button>
        <button :class="[{ 'is-active': isActive.ordered_list() }, 'button', 'tooltip']" @click="commands.ordered_list" data-tooltip="Нумерованный список">
          <span class="icon-list-numbered"></span>
        </button>
        <button :class="[{ 'is-active': isActive.blockquote() }, 'button', 'tooltip']" @click="commands.blockquote" data-tooltip="Цитата">
          <span class="icon-quotes-right"></span>
        </button>
        <button :class="[{ 'is-active': isActive.code() }, 'button', 'tooltip']" @click="commands.code" data-tooltip="Код">
          <span class="icon-embed"></span>
        </button>

        <div class="float-right" style="margin-top: -8px">
          <label class="form-switch">
            <input type="checkbox"><i class="form-icon"></i> Подписаться на комментарии
          </label>
        </div>
        <div class="clearfix"></div>
      </div>
    </editor-menu-bar>
    <div class= "form-input editor">
      <editor-content :editor="editor"></editor-content>
    </div>
    <br>
    <div>
      <input class="btn btn-primary float-left" type="submit" value="Отправить" @click="send" :disabled="isSending" />
      <div v-if="isSending" class="loading float-left" style="margin-top: 10px; margin-left: 20px"></div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/post'
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
} from 'tiptap-extensions'

export default {
  props: [ 'postUrl', 'action', 'parentId' ],
  data() {
    return {
      editor: null,
      isSending: false
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
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new History()
      ]
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    send() {
      this.isSending = true
      this.$comments.sendComment(this.postUrl, this.editor.getHTML(), this.parentId).then(comment => {
        this.isSending = false
        this.editor.setContent('')
        if (this.action)
          this.action(comment.id)
      })
    }
  },
  components: {
    EditorContent,
    EditorMenuBar
  }
}
</script>

<style scoped>
.editor {
  height: auto;
}

.menu-bar {
  font-size: 13px;
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
</style>

<style>
.editor .ProseMirror:focus {
  outline: none;
}

.editor .ProseMirror p {
  margin: 0 0 0.2rem;
}
</style>

