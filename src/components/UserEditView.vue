<template>
  <div class="user py-2">
    <div class="columns">
      <div class="column col-8">
        <h4>Основная информация</h4>

        <div class="form-group">
          <label class="form-label" for="name">Имя пользователя</label>
          <input class="form-input" v-model="user.name" name="name" id="name" />
          <!-- v-validate="validation.username" -->
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input class="form-input" v-model="user.email" name="email" id="email" />
          <!-- v-validate="validation.email" -->
        </div>

        <div class="form-group">
          <label class="form-label" for="birthday">День рождения</label>
          <input class="form-input" v-model="birthday" type="date" name="birthday" id="birthday" />
        </div>

        <div class="form-group">
          <label class="form-label" for="about">О себе</label>
          <editor ref="editor"></editor>
        </div>

        <button id="edit-btn" class="btn btn-primary" @click="edit" :disabled="!isValid">Изменить</button>
      </div>

      <div class="column col-4">
        <div class="form-group">
          <image-upload @complete="imageUploaded">
            <h4>Изменить аватар</h4>
            <avatar :user="user" size="xl" :card="false" />
          </image-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import 'moment/locale/ru'
import Editor from '@/components/editor/Editor.vue'
import ImageUpload from '@/components/editor/ImageUploadView.vue'
import Avatar from '@/components/elements/Avatar.vue'

Moment.locale('ru')

export default {
  props: ['user'],
  // data () {
  //   return {
  //     validation: {
  //       username: {
  //         length: () => this.user.name.length >= 3
  //       },
  //       email: {
  //         length: () => this.user.email.length >= 5,
  //         isEmail: () => /\S+@\S+\.\S+/.test(this.user.email) // Broad check
  //       }
  //     }
  //   }
  // },
  mounted () {
    this.$refs.editor.setContent(this.user.about)
  },
  computed: {
    birthday: {
      get () {
        return Moment(this.user.birthday).format(Moment.HTML5_FMT.DATE)
      },
      set (date) {
        this.user.birthday = date
      }
    },
    isValid () {
      // return this.validation.username.success &&
      //   this.validation.email.success
      return true
    }
  },
  methods: {
    edit () {
      this.user.about = this.$refs.editor.getHtml()
      this.$parent.editUser(this.user)
    },
    imageUploaded (images) {
      const avatar = images[0]
      this.$parent.editAvatar(avatar)
    }
  },
  components: {
    Editor,
    ImageUpload,
    Avatar
  }
}
</script>

<style>
.bio-editor .ProseMirror {
  min-height: 150px;
}
</style>
