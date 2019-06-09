<template>
  <div class="user column col-12 py-2">
    <div class="columns">
      <div class="column col-8">
        <div class="form-group">
          <label class="form-label" for="name">Имя пользователя</label>
          <input
            class="form-input"
            v-model="user.name"
            v-validate="validation.username"
            name="name"
            id="name"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="email">Email</label>
          <input
            class="form-input"
            v-model="user.email"
            v-validate="validation.email"
            name="email"
            id="email"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="birthday">День рождения</label>
          <input
            class="form-input"
            v-model="birthday"
            type="date"
            name="birthday"
            id="birthday"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="about">О себе</label>
          <editor
            type="basic"
            ref="editor"
            editor-class="bio-editor"
            :store="store"
          ></editor>
        </div>

        <button id="edit-btn" class="btn" v-on:click="edit()" :disabled="!isValid">Изменить</button>
      </div>

      <div class="column col-4">
        <form class="form-group" ref="avatar">
          <label class="form-label" for="avatar">Аватар</label>
          <img :src="'https://beta.kolenka.net/content/' + user.avatar.id + '/'" style="width: auto; max-width: 100%" />
          <input class="form-input" type="file" name="file" id="avatar">
        </form>
        <button id="edit-avatar-btn" class="btn" v-on:click="editAvatar()">Обновить аватар</button>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import 'moment/locale/ru'
import Editor from '@/components/editor/Editor.vue'

Moment.locale('ru')

export default {
  props: ['user'],
  data() {
    return {
      store: {
        html: ''
      },
      validation: {
        username: {
          length: () => this.user.name.length >= 3
        },
        email: {
          length: () => this.user.email.length >= 5,
          isEmail: () => /\S+@\S+\.\S+/.test(this.user.email)
        }
      }
    }
  },
  mounted() {
    this.$refs.editor.setContent(this.user.about)
  },
  computed: {
    birthday: {
      get: function () {
        return Moment(this.user.birthday).format(Moment.HTML5_FMT.DATE)
      },
      set: function (date) {
        this.user.birthday = date
      }
    },
    isValid() {
      return this.validation.username.success &&
        this.validation.email.success
    }
  },
  methods: {
    edit: function () {
      this.user.about = this.store.html
      this.$parent.editUser(this.user)
    },
    editAvatar: function () {
      this.$parent.editAvatar(new FormData(this.$refs.avatar))
    }
  },
  components: {
    Editor
  }
}
</script>

<style>
.bio-editor .ProseMirror {
  min-height: 150px;
}
</style>
