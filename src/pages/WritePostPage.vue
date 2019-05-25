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
                required
              />
              <p class="form-input-hint">/posts/{{ slug }}</p>
            </div>
          </div>

          <editor
            type="extended"
            editor-class="post-editor"
            ref="editor"
            :store="store"
            storageKey="post-text"
            storageType="local"
          ></editor>

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
              <div v-if="isSending" class="loading" style="margin-right: 32px"></div>
              <input type="submit" class="btn" value="Сохранить как черновик" @click="send(true)" :disabled="!isValid || isSending">
              <input type="submit" class="btn btn-primary" value="Написать" @click="send(false)" :disabled="!isValid || isSending">
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="bottom-padd"></div>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import PostService from '@/services/post'
import getSlug from 'speakingurl'

export default {
  data() {
    return {
      ...this.mapData({
        meta: 'meta/data/user',
        blogs: 'userBlogs/everything'
      }),
      model: {
        title: localStorage.getItem('post-title') || '',
        blog: null
      },
      store: {
        html: '',
        length: 0
      },
      isSending: false
    }
  },
  mounted() {
    if (!this.$meta.actions.isLoggedIn()) {
      this.$router.replace({ path: '/' })
      return
    }

    if (this.$route.params.edit) {
      this.model.title = this.$route.params.edit.title
      this.model.blog = this.$route.params.edit.blog.id
      this.$refs.editor.setContent(this.$route.params.edit.text)
    }
  },
  beforeDestroy() {
    localStorage.setItem('post-title', this.model.title)
  },
  methods: {
    send(draft) {
      this.isSending = true

      let method = this.$route.params.edit ?
      PostService.editPost(
        this.$route.params.edit.url,
        this.model.title,
        this.store.html,
        draft,
        this.model.blog
      ) :
      PostService.createPost(
        this.model.title,
        this.store.html,
        draft,
        this.model.blog
      )
      
      method.then(data => {
        localStorage.setItem('post-text', null)
        localStorage.setItem('post-title', null)
        this.isSending = false
        this.$router.replace({ name: 'post', params: { post: data.post.url } })
      })
    }
  },
  computed: {
    slug() {
      return getSlug(this.model.title, { lang: 'ru' })
    },
    isValid() {
      return this.model.title.length > 3 &&
        this.store.length > 10 &&
        this.model.blog != null
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
