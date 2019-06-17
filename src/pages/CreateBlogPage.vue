<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div class="column">
        
        <h2>{{ $route.params.edit ? 'Редактировать блог' : 'Новый блог' }}</h2>
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
              <p class="form-input-hint">/blogs/
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

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="description">Описание</label>
            </div>
            <div class="col-9 col-sm-12">
              <textarea 
                class="form-input" 
                type="text" 
                id="description"
                maxlength="250"
                v-model="model.description"
                v-validate="validation.description"
              ></textarea>
            </div>
          </div>

          <div class="form-group">
            <div class="col-3 col-sm-12">
              <label class="form-label" for="type">Тип блога</label>
            </div>
            <div class="col-9 col-sm-12">
              <select class="form-select">
                <option value="1">Публичный (вступать и писать могут все)</option>
                <option value="2">Закрытый (вступать и писать могут только по приглашениям)</option>
                <option value="3">Скрытый</option>
              </select>
            </div>
          </div>

          <div class="form-group float-right">
            <div class="btn-group btn-group-block" style="width:350px">
              <div v-if="isLoading" class="loading" style="margin-right: 32px"></div>
              <input type="submit" class="btn btn-primary" :value="$route.params.edit ? 'Изменить' : 'Создать'" @click="send()" :disabled="isLoading || !isValid">
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="bottom-padd"></div>
  </div>
</template>

<script>
import slugify from 'speakingurl'

export default {
  data() {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      model: {
        title: '',
        description: '',
        type: 1
      },
      validation: {
        title: {
          length: () => this.model.title.length >= 3
        },
        description: {
          length: () => this.model.description.length <= 512
        },
        slug: {
          isUrl: () => /^[A-Za-z0-9-_]+$/.test(this.newSlug)
        }
      },
      isLoading: false,
      isChangingSlug: false,
      newSlug: ''
    }
  },
  mounted() {
    if (!this.auth.user) {
      this.$router.replace({ path: '/' })
    }

    const edit = this.$route.params.edit
    
    if (edit) {
      this.model.title = edit.title
      this.model.description = edit.description
      this.model.type = edit.blog_type
    }
  },
  methods: {
    send() {
      let method = this.$route.params.edit ?
      this.$blogs.editBlog(
        this.$route.params.edit.url,
        this.model.title,
        this.model.description,
        this.model.type
      ) :
      this.$blogs.createBlog(
        this.model.type,
        this.model.title,
        this.model.description,
        (this.slugChanged ? this.newSlug : this.slug)
      )

      method.then(data => {
        this.$toast.show('Блог был успешно отредактирован')
        this.$router.replace({ name: 'blog', params: { name: data.url } })
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
             this.validation.description.success &&
             (this.slugChanged ? this.validation.slug.success : true)
    }
  }
}
</script>

