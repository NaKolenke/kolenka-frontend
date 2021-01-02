<template>
  <div>
    <h2>{{ isInEditMode ? "Редактировать джем" : "Новый джем" }}</h2>
    <div class="columns">
      <div class="column col-8">
        <form-container>
          <form-field
            fieldId="title"
            title="Название"
            type="text"
            v-model="title"
            :validation="validation.title"
          >
            <slug-hint
              urlBase="/jams/"
              v-model="url"
              :field="title"
              :can-change="!isInEditMode"
            ></slug-hint>
          </form-field>

          <form-field
            fieldId="shortdescription"
            title="Короткое описание"
            type="text"
            v-model="shortDescription"
            :validation="validation.shortDescription"
          ></form-field>

          <editor ref="editor"></editor>
          <!-- <editor ref="editor" v-validate="validation.description"></editor> -->

          <form-field
            fieldId="startdate"
            title="Дата начала"
            type="date"
            v-model="startDate"
            :validation="validation.startDate"
          ></form-field>

          <form-field
            fieldId="enddate"
            title="Дата окончания"
            type="date"
            v-model="endDate"
            :validation="validation.endDate"
          ></form-field>

          <hr />

          <jam-criterias-editor v-model="criterias"></jam-criterias-editor>

          <hr />

          <save-button
            :title="isInEditMode ? 'Изменить' : 'Создать'"
            :isLoading="isLoading"
            :isValid="isValid"
            @click="send"
          />
        </form-container>
      </div>

      <div class="column col-4">
        <p class="text-dark">Рекомендуемый размер лого: 128х128 пикселей</p>
        <image-upload @complete="logoUploaded"></image-upload>
      </div>
    </div>

    <div class="bottom-padd"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Moment from 'moment'

import errors from '@/utils/errors'

import ImageUpload from '@/components/editor/ImageUploadView.vue'
import FormContainer from '@/components/forms/FormContainer.vue'
import FormField from '@/components/forms/FormField.vue'
import SlugHint from '@/components/forms/SlugHint.vue'
import Editor from '@/components/editor/Editor.vue'
import SaveButton from '@/components/forms/SaveButton.vue'
import JamCriteriasEditor from '@/components/jams/JamCriteriasEditor.vue'


export default {
  metaInfo () {
    return {
      title: 'Создать джем'
    }
  },
  data () {
    return {
      title: '',
      shortDescription: '',
      url: '',
      startDate: new Date().toISOString().substr(0, 10),
      endDate: '',
      criterias: [
        {
          id: -1,
          title: 'Тема',
          order: 0
        }
      ],
      logoId: null,

      validation: {
        title: {
          length: () => this.title.length >= 3
        },
        shortDescription: {
          length: () => this.shortDescription.length <= 512
        },
        startDate: {
          notEmpty: () => this.startDate.length > 0
        },
        endDate: {
          notEmpty: () => this.endDate.length > 0,
          afterStart: () => {
            var s = Date.parse(this.startDate)
            var e = Date.parse(this.endDate)

            return e > s
          }
        }
      },
    }
  },
  mounted () {
    if (!this.user) {
      this.$router.replace({ path: '/' })
      return
    }

    if (this.isInEditMode) {
      this.refreshJam()
    }
  },
  methods: {
    send () {
      this.$store.dispatch('startLoading')

      let result = null

      let description = this.$refs.editor.getHtml()
      if (this.isInEditMode) {
        result = this.$store.dispatch('jams/editJam', {
          title: this.title,
          description: description,
          shortDescription: this.shortDescription,
          url: this.url,
          startDate: this.startDate,
          endDate: this.endDate,
          criterias: this.criterias,
          logo: this.logoId
        })
      } else {
        result = this.$store.dispatch('jams/createJam', {
          title: this.title,
          description: description,
          shortDescription: this.shortDescription,
          url: this.url,
          startDate: this.startDate,
          endDate: this.endDate,
          criterias: this.criterias,
          logo: this.logoId
        })
      }
      result
        .then(data => {
          if (this.isInEditMode) {
            this.$toast.show('Джем был успешно отредактирован')
          } else {
            this.$toast.show('Джем был успешно создан')
          }

          this.$store.dispatch('stopLoading')
          this.$router.push({ name: 'jam', params: { jamUrl: data.url } })
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
          this.$store.dispatch('stopLoading')
        })
    },
    logoUploaded (images) {
      this.logoId = images[0].id
    },
    refreshJam () {
      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/getJam', { url: jamUrl })
        .then(data => {
          this.title = data.title
          this.$refs.editor.setContent(data.description)
          this.shortDescription = data.short_description
          this.url = data.url
          this.startDate = Moment.unix(data.start_date).format('YYYY-MM-DD')
          this.endDate = Moment.unix(data.end_date).format('YYYY-MM-DD')
          this.criterias = data.criterias
          this.logoId = null
          if (data.logo) {
            this.logoId = data.logo.id
          }

          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    }
  },
  computed: {
    isValid () {
      return this.validation.title.success &&
        // this.validation.description.success &&
        this.validation.shortDescription.success &&
        this.validation.startDate.success &&
        this.validation.endDate.success
    },
    isInEditMode () {
      return this.$route.name == 'edit-jam'
    },
    ...mapState({
      user: state => state.users.me,
      isLoading: state => state.isLoading
    }),
  },
  components: {
    ImageUpload,
    FormContainer,
    FormField,
    SlugHint,
    SaveButton,
    JamCriteriasEditor,
    Editor
  }
}
</script>

<style lang="scss" scoped>
hr {
  border: 0;
  height: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
