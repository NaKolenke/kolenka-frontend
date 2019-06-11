<template>
  <div>
    <editor
      type="basic"
      ref="editor"
      editor-class="comment-editor"
      :store="store"
      :limit="400"
      :storageKey="'comments/' + postUrl + '/' + parentId"
    ></editor>
    <div>
      <input class="btn btn-primary float-left" type="submit" value="Отправить" @click="send" :disabled="isSending || !isValid" />
      <div v-if="isSending" class="loading float-left" style="margin-top: 10px; margin-left: 20px"></div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/Editor.vue'

export default {
  props: [ 
    'postUrl', 
    'action', 
    'parentId' 
  ],
  data() {
    return {
      isSending: false,
      store: {
        html: '',
        length: 0
      }
    }
  },
  methods: {
    send() {
      this.isSending = true
      this.$comments.sendComment(this.postUrl, this.store.html, this.parentId).then(comment => {
        this.isSending = false
        this.$refs.editor.setContent('')
        if (this.action)
          this.action(comment.id)
      })
    }
  },
  computed: {
    isValid() {
      return this.store.length > 3
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

