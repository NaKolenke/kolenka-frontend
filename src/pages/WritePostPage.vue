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
              <input 
                class="form-input" 
                type="text" 
                id="title" 
                v-model="model.title"
              />
              <p class="form-input-hint">/posts/{{ slug }}</p>
            </div>
          </div>

          <editor type="extended" editor-class="post-editor" ref="editor"></editor>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="blog">В блог</label>
            </div>
            <div class="col-9 col-sm-12">
              <select class="form-select" id="blog" v-model="model.blog">
                <option :value="null" selected>Нет</option>
                <option v-for="blog in blogs" :key="blog.id" :value="blog.id">{{ blog.title }} (Создатель: {{ blog.creator.username }})</option>
              </select>
              <p class="form-input-hint" style="margin-bottom: 0">Чтобы опубликовать запись, выберите блог</p>
            </div>
          </div>

          <div class="form-group float-right">
            <div class="btn-group btn-group-block" style="width:350px">
              <input type="submit" class="btn" value="Сохранить как черновик" @click="send(true)" :disabled="!isValidDraft">
              <input type="submit" class="btn btn-primary" value="Написать" @click="send(false)" :disabled="!isValidPublish">
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import PostService from '@/services/post'
import getSlug from 'speakingurl'
import Editor from '@/components/Editor'

export default {
  data() {
    return {
      ...this.mapData({
        meta: 'meta/data/user',
        blogs: 'userBlogs/everything'
      }),
      model: {
        title: sessionStorage.getItem('post-title') || '',
        blog: null
      }
    }
  },
  mounted() {
    if (!this.$meta.actions.isLoggedIn()) {
      this.$router.replace({ path: '/' })
      return
    }

    this.$refs.editor.setContent(sessionStorage.getItem('post-text') || '')
  },
  beforeDestroy() {
    sessionStorage.setItem('post-text', this.$refs.editor.content())
    sessionStorage.setItem('post-title', this.model.title)
  },
  methods: {
    send(draft) {      
      PostService.createPost(this.model.title, this.$refs.editor.content(), draft, this.model.blog).then(data => {
        console.log(data)
        sessionStorage.setItem('post-text', null)
        sessionStorage.setItem('post-title', null)
      })
    }
  },
  computed: {
    slug() {
      return getSlug(this.model.title, { lang: 'ru' })
    },
    isValidPublish() {
      return this.model.title.length > 3 &&
        this.$refs.editor != null &&
        this.$refs.editor.content().length > 10 &&
        this.model.blog != null
    },
    isValidDraft() {
      return this.model.title.length > 3 &&
        this.$refs.editor != null &&
        this.$refs.editor.content().length > 10
    }
  },
  components: {
    Editor
  }
}
</script>

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
