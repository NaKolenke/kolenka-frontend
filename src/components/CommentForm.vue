<template>
  <div>
    <editor disableFloatingMenu ref="editor"></editor>
    <div>
      <input
        class="btn btn-primary float-left mt-2"
        type="submit"
        value="Отправить"
        @click="send"
        :disabled="isSending || !isValid"
      />
      <div v-if="isSending" class="loading float-left" style="margin-top: 10px; margin-left: 20px"></div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import Editor from '@/components/editor/Editor.vue'
import errors from '@/utils/errors'

/*
  Events:
    @sent - called when a comment is sent
*/

export default {
  props: {
    postUrl: String, // Url of the post the comment in
    parentId: Number // Parent comment id
  },
  data () {
    return {
      isSending: false,
      isMounted: false
    }
  },
  mounted () {
    this.isMounted = true
  },
  methods: {
    send () {
      this.isSending = true
      this.$store
        .dispatch('comments/postComment',
          { url: this.postUrl, text: this.$refs.editor.getHtml(), parent: this.parentId })
        .then(comment => {
          this.isSending = false
          this.$refs.editor.setContent('')
          this.$emit('sent', comment.id)
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    isValid () {
      if (this.isMounted) {
        return this.$refs.editor.getHtml().length > 9
      }
      return false
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

