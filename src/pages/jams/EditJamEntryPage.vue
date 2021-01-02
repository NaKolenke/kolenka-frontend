<template>
  <div>
    <h2>Редактировать заявку</h2>
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
              urlBase="/jams/jam-id/"
              v-model="url"
              :field="title"
              :can-change="true"
            ></slug-hint>
          </form-field>

          <form-field
            fieldId="shortDescription"
            title="Короткое описание (будет использоваться на списке заявок к джему. Постарайтесь привлечь внимание!)"
            type="text"
            v-model="shortInfo"
            :validation="validation.shortInfo"
          ></form-field>

          <editor ref="editor"></editor>
          <!-- <editor ref="editor" v-validate="validation.info"></editor> -->

          <hr />

          <jam-entry-links-editor v-model="links"></jam-entry-links-editor>

          <hr />

          <save-button
            title="Изменить"
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

import errors from '@/utils/errors'

import ImageUpload from '@/components/editor/ImageUploadView.vue'
import FormContainer from '@/components/forms/FormContainer.vue'
import FormField from '@/components/forms/FormField.vue'
import SlugHint from '@/components/forms/SlugHint.vue'
import Editor from '@/components/editor/Editor.vue'
import SaveButton from '@/components/forms/SaveButton.vue'
import JamEntryLinksEditor from '@/components/jams/JamEntryLinksEditor.vue'

export default {
  metaInfo () {
    return {
      title: 'Редактировать заявку'
    }
  },
  data () {
    return {
      title: '',
      shortInfo: '',
      url: '',
      logoId: null,
      jamUrl: null,
      links: [
      ],

      validation: {
        title: {
          length: () => this.title && this.title.length >= 3
        },
        info: {
          // length: () => this.info && this.info.length <= 512
        },
        shortInfo: {
          length: () => this.shortInfo && this.shortInfo.length <= 512
        },
      },
    }
  },
  mounted () {
    if (!this.user) {
      this.$router.replace({ path: '/' })
      return
    }

    this.refreshEntry()
  },
  methods: {
    send () {
      this.$store.dispatch('startLoading')

      let info = this.$refs.editor.getHtml()

      this.$store.dispatch('jams/editJamEntry', {
        title: this.title,
        info: info,
        shortInfo: this.shortInfo,
        url: this.url,
        logo: this.logoId,
        links: this.links,
        jamUrl: this.jamUrl
      })
        .then(_data => {
          this.$toast.show('Ваша заявка была успешно отредактирована')

          this.$store.dispatch('stopLoading')
          this.$router.push({ name: 'my-jam-entry', params: { jamUrl: this.jamUrl } })
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
    refreshEntry () {
      this.$store.dispatch('startLoading')

      this.jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/getMyEntry', { jamUrl: this.jamUrl })
        .then(data => {
          this.title = data.title
          this.$refs.editor.setContent(data.info)
          this.shortInfo = data.short_info
          this.url = data.url
          if (data.logo) {
            this.logoId = data.logo.id
          }
          this.links = data.links || []

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
        // this.validation.info.success &&
        this.validation.shortInfo.success
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
    JamEntryLinksEditor,
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
