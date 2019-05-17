<template>
  <div>
    <editor type="basic" ref="editor" editor-class="comment-editor"></editor>
    <div>
      <input class="btn btn-primary float-left" type="submit" value="Отправить" @click="send" :disabled="isSending || !isValid" />
      <div v-if="isSending" class="loading float-left" style="margin-top: 10px; margin-left: 20px"></div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/Editor'

export default {
  props: [ 'postUrl', 'action', 'parentId' ],
  data() {
    return {
      isSending: false
    }
  },
  methods: {
    send() {
      this.isSending = true
      this.$comments.sendComment(this.postUrl, this.$refs.editor.content(), this.parentId).then(comment => {
        this.isSending = false
        this.$refs.editor.setContent('')
        if (this.action)
          this.action(comment.id)
      })
    }
  },
  computed: {
    isValid() {
      return true //this.$refs.editor != null && this.$refs.editor.content().length > 0 // TODO: Doesn't work
    }
  },
  components: {
    Editor
  }
}
</script>

<style>
.comment-editor {
  height: auto;
}

.comment-editor .ProseMirror:focus {
  outline: none;
}

.comment-editor:focus-within {
  border-color: blueviolet;
}

.comment-editor .ProseMirror p {
  margin: 0 0 0.2rem;
}
</style>

