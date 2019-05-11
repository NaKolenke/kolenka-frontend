<template>
  <div>
    <div class="user column col-12 py-2">
      <div class="columns">
        <div class="column col-8">
          <div class="form-group">
            <label class="form-label" for="name">Имя пользователя</label>
            <input class="form-input" v-model="user.name" name="name" id="name">
          </div>

          <div class="form-group">
            <label class="form-label" for="email">Email</label>
            <input class="form-input" v-model="user.email" name="email" id="email">
          </div>

          <div class="form-group">
            <label class="form-label" for="birthday">День рождения</label>
            <input class="form-input" v-model="birthday" type="date" name="birthday" id="birthday">
          </div>

          <div class="form-group">
            <label class="form-label" for="about">О себе</label>
            <editor type="basic" ref="editor" editor-class="bio-editor"></editor>
          </div>

          <button id="edit-btn" class="btn" v-on:click="edit()">Изменить</button>
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
  </div>
</template>

<script>
import Moment from 'moment'
import 'moment/locale/ru'
import Editor from '@/components/Editor'

Moment.locale('ru')

export default {
  props: ['user'],
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
    }
  },
  methods: {
    edit: function () {
      this.user.about = this.$refs.editor.content()
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
