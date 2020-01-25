<template>
  <div>
    <h2 v-if="isInEditMode">Редактирование поста</h2>
    <h2 v-else>Новый пост</h2>
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
          <p class="form-input-hint">
            /posts/
            <span
              v-if="!isChangingSlug"
              @click="changeSlug"
            >{{ slugChanged ? newSlug : slug }}</span>
            <input
              v-else
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

      <div v-if="isLoading">
        <loading-view></loading-view>
      </div>
      <editor ref="editor" v-validate="validation.body"></editor>

      <div class="form-group mt-2">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="tags">Теги</label>
        </div>
        <div class="col-9 col-sm-12">
          <span v-for="tag in model.tags" :key="tag.id" :value="tag.id" class="chip">
            {{tag.title}}
            <a
              class="icon icon-delete mx-2"
              aria-label="Remove tag"
              role="button"
              @click="removeTag(tag)"
            ></a>
          </span>

          <input
            class="form-input"
            type="text"
            id="tags"
            v-model="model.newTag"
            @input="refreshSuggestedTags()"
          />

          <div v-if="suggestedTags.isLoading" class="loading m-2"></div>
          <span
            v-else
            v-for="tag in suggestedTags.items"
            :key="'suggested' + tag.id"
            :value="tag.id"
            class="chip"
          >
            {{tag.title}}
            <a
              class="icon icon-check mx-2"
              aria-label="Add tag"
              role="button"
              @click="addTag(tag)"
            ></a>
          </span>
        </div>
      </div>

      <div class="form-group mt-2">
        <div class="col-3 col-sm-12">
          <label class="form-label" for="blog">В блог</label>
        </div>
        <div class="col-9 col-sm-12">
          <select class="form-select" id="blog" v-model="model.blog" v-validate="validation.blog">
            <option :value="null" selected>Нет</option>
            <option
              v-for="blog in blogs"
              :key="blog.id"
              :value="blog.id"
            >{{ blog.title }} (Создатель: {{ blog.creator.username }})</option>
          </select>
          <p class="form-input-hint" style="margin-bottom: 0">
            Чтобы опубликовать запись, выберите блог.
            <br />
            <i
              v-if="user.is_admin"
            >Так как используется учетная запись администратора, можно выбрать любой блог</i>
          </p>
        </div>
      </div>

      <div class="form-group float-right">
        <div class="btn-group btn-group-block">
          <div v-if="isSending" class="loading" style="margin-right: 32px"></div>
          <input
            type="submit"
            class="btn"
            value="Сохранить как черновик"
            @click="send(true)"
            :disabled="!isValid || isSending"
          />
          <input
            type="submit"
            class="btn btn-primary"
            value="Написать"
            @click="send(false)"
            :disabled="!isValid || isSending"
          />
        </div>
      </div>

      <div class="form-group float-left" v-if="isInEditMode">
        <div class="btn-group btn-group-block">
          <input type="submit" class="btn btn-error" value="Удалить" @click="deletePost()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Editor from '@/components/editor/Editor.vue'
import LoadingView from '@/components/LoadingView.vue'
import slugify from 'speakingurl'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  data () {
    return {
      model: {
        title: '',
        blog: null,
        tags: [],
        newTag: ''
      },
      validation: {
        title: {
          length: () => this.model.title.length >= 3
        },
        blog: {
          notNull: () => this.model.blog != null
        },
        body: {
          length: () => this.$refs.editor.getHtml().length >= 10
        },
        slug: {
          isUrl: () => /^[A-Za-z0-9-_]+$/.test(this.newSlug)
        }
      },
      isSending: false,
      isLoading: false,
      isChangingSlug: false,
      newSlug: '',
      blogs: [],
    }
  },
  created () {
    if (!this.user) {
      this.$router.replace({ path: '/' })
      return
    }
  },
  mounted () {
    if (this.isInEditMode) {
      this.refreshPost(this.$route)
    } else {
      this.model.title = ''
      this.model.blog = null
      this.model.tags = []
      this.model.newTag = ''
      this.$refs.editor.setContent('')
    }

    this.refreshBlogsList()
  },
  methods: {
    refreshPost (route) {
      this.isLoading = true
      this.$store.dispatch('posts/getPost', { url: route.params.post })
        .then(post => {
          this.isLoading = false

          this.model.title = post.title
          if (post.blog != null) {
            this.model.blog = post.blog.id
          }
          this.model.tags = post.tags
          this.$refs.editor.setContent(post.text)
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
          this.$router.push({ path: '/404' })
        })
    },
    refreshBlogsList () {
      if (this.user.is_admin) {
        this.$store.dispatch('blogs/getAllBlogs', { pagination: new Pagination(this.page, 1000) })
          .then(res => {
            this.blogs = res.blogs
          }).catch(error => {
            errors.handle(error)
            this.$toast.error(errors.getText(error))
          })
      } else {
        this.blogs = this.myBlogs
      }
    },
    send (draft) {
      this.isSending = true

      let result = null
      if (this.isInEditMode) {
        result = this.$store.dispatch('posts/editPost', {
          title: this.model.title,
          text: this.$refs.editor.getHtml(),
          url: this.slug,
          originalUrl: this.$route.params.post,
          draft: draft,
          blogId: this.model.blog,
          tags: this.model.tags.map(t => t.title),
        })
      } else {
        result = this.$store.dispatch('posts/createPost', {
          title: this.model.title,
          text: this.$refs.editor.getHtml(),
          url: (this.slugChanged ? this.newSlug : this.slug),
          draft: draft,
          blogId: this.model.blog,
          tags: this.model.tags.map(t => t.title),
        })
      }

      result.then(data => {
        this.isSending = false
        this.$router.replace({ name: 'post', params: { post: data.url } })
      }).catch(error => {
        this.isSending = false

        errors.handle(error)
        this.$toast.error(errors.getText(error))
      })
    },
    changeSlug () {
      this.isChangingSlug = true

      if (!this.slugChanged) {
        this.newSlug = this.slug
      }
    },
    deletePost () {
      this.$store.dispatch('posts/deletePost', {
        url: this.$route.params.post
      })
        .then(_ => {
          this.$router.replace({ name: 'home' })
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    addTag (tag) {
      // remove tag if it already in the list
      this.model.tags = this.model.tags.filter(t => t.title != tag.title)
      // than add it
      this.model.tags = this.model.tags.concat([{ id: tag.id, title: tag.title }])
      this.model.newTag = ''
      this.$store.dispatch('tags/getSuggestions', { tag: '' })
    },
    removeTag (tag) {
      this.model.tags = this.model.tags.filter(t => t.title != tag.title)
    },
    refreshSuggestedTags () {
      this.$store.dispatch(
        'tags/getSuggestions',
        { tag: this.model.newTag })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    slug () {
      return slugify(this.model.title, { lang: 'ru' })
    },
    slugChanged () {
      return this.newSlug !== '' && this.newSlug !== this.slug
    },
    isValid () {
      return this.validation.title.success &&
        this.validation.body.success &&
        this.validation.blog.success &&
        (this.slugChanged ? this.validation.slug.success : true)
    },
    isInEditMode () {
      return this.$route.params.post
    },
    ...mapState({
      user: state => state.users.me,
      myBlogs: state => state.blogs.my,
      suggestedTags: state => state.tags.suggested,
    }),
  },
  components: {
    Editor,
    LoadingView,
  }
}
</script>

<style>
.slug-input {
  display: inline-block;
  width: auto;
}
</style>
