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
                v-validate="validation.title"
                required
              />
              <p class="form-input-hint">/posts/
                <span v-if="!isChangingSlug" @click="changeSlug">{{ slugChanged ? newSlug : slug }}</span>
                <input v-else 
                  type="text" 
                  :class="['form-input', 'input-sm', { 'is-error': !validation.slug.success }, 'slug-input']" 
                  v-model="newSlug" 
                  v-validate="validation.slug"
                  @blur="isChangingSlug = false" 
                  @keyup="if ($event.keyCode === 27) isChangingSlug = false"
                  autofocus 
                />
              </p>
            </div>
          </div>

          <editor
            type="extended"
            editor-class="post-editor"
            ref="editor"
            :store="store"
            storageKey="post-text"
            storageType="local"
            v-validate="validation.body"
          ></editor>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="blog">В блог</label>
            </div>
            <div class="col-9 col-sm-12">
              <select class="form-select" id="blog" v-model="model.blog" v-validate="validation.blog">
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
import Editor from '@/components/editor/Editor.vue'
import slugify from 'speakingurl'

export default {
  metaInfo() {
    return {
      title: 'Написать запись'
    }
  },
  data() {
    return {
      ...this.mapData({
        auth: 'auth/data',
        blogs: 'blogs/my'
      }),
      model: {
        title: localStorage.getItem('post-title') || '',
        blog: null
      },
      store: {
        html: '',
        length: 0
      },
      validation: {
        title: {
          length: () => this.model.title.length >= 3
        },
        blog: {
          notNull: () => this.model.blog != null
        },
        body: {
          length: () => this.store.length >= 10
        },
        slug: {
          isUrl: () => /^[A-Za-z0-9-_]+$/.test(this.newSlug)
        }
      },
      isSending: false,
      isChangingSlug: false,
      newSlug: ''
    }
  },
  created() {    
    if (!this.auth.user) {
      this.$router.replace({ path: '/' })
      return
    }
  },
  mounted() {
    const edit = this.$route.params.edit
    
    if (edit) {
      this.model.title = edit.title
      this.model.blog = edit.blog.id
      this.$refs.editor.setContent(edit.text)
    }
  },
  beforeDestroy() {
    localStorage.setItem('post-title', this.model.title)
  },
  methods: {
    send(draft) {
      this.isSending = true

      let method = this.$route.params.edit ?
      this.$posts.editPost(
        this.$route.params.edit.url,
        this.model.title,
        this.store.html,
        draft,
        this.model.blog
      ) :
      this.$posts.createPost(
        this.model.title,
        this.store.html,
        (this.slugChanged ? this.newSlug : this.slug),
        draft,
        this.model.blog
      )
      
      method.then(data => {
        localStorage.setItem('post-text', null)
        localStorage.setItem('post-title', null)
        this.isSending = false
        this.$router.replace({ name: 'post', params: { post: data.url } })
      }).catch(err => {
        console.log(err)
      })
    },
    changeSlug() {
      this.isChangingSlug = true

      if (!this.slugChanged) {
        this.newSlug = this.slug
      }
    }
  },
  computed: {
    slug() {
      return slugify(this.model.title, { lang: 'ru' })
    },
    slugChanged() {
      return this.newSlug !== '' && this.newSlug !== this.slug
    },
    isValid() {
      return this.validation.title.success &&
             this.validation.body.success &&
             this.validation.blog.success &&
             (this.slugChanged ? this.validation.slug.success : true)
    }
  },
  components: {
    Editor
  }
}
</script>

<style>
.slug-input {
  display: inline-block;
  width: auto;
}

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
