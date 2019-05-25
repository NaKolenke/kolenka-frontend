<template>
  <div class="container col-9 col-mx-auto">
    <div class="columns">
      <div class="column">
        
        <h2>Новый блог</h2>
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
              <p class="form-input-hint">/blogs/{{ slug }}</p>
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
import BlogService from '@/services/blog'
import slugify from 'speakingurl'

export default {
  data() {
    return {
      model: {
        title: '',
        description: '',
        type: 1
      },
      isLoading: false
    }
  },
  mounted() {
    if (this.$route.params.edit) {
      this.model.title = this.$route.params.edit.title
      this.model.description = this.$route.params.edit.description
      this.model.type = this.$route.params.edit.blog_type
    }
  },
  methods: {
    send() {
      let method = this.$route.params.edit ?
      BlogService.editBlog(
        this.$route.params.edit.url,
        this.model.title,
        this.model.description,
        this.model.type
      ) :
      BlogService.createBlog(
        this.model.type,
        this.model.title,
        this.model.description,
        this.slug
      )

      method.then(data => {
        this.$toast.show('Блог был успешно отредактирован')
        this.$router.replace({ name: 'blog', params: { name: data.blog.url } })
      })
    }
  },
  computed: {
    slug() {
      return slugify(this.model.title, { lang: 'ru' })
    },
    isValid() {
      return this.model.title.length > 3
    }
  }
}
</script>

