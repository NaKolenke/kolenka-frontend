<template>
  <div>
    <div class="user column col-12 py-2">
      <div class="columns">
        <div class="column col-8">
          <div class="form-group">
            <label class="form-label" for="name">Имя пользователя</label>
            <input class="form-input" v-model="user.name" name="name">

            <label class="form-label" for="email">Email</label>
            <input class="form-input" v-model="user.email" name="email">

            <label class="form-label" for="birthday">День рождения</label>
            <input class="form-input" v-model="birthday" type="date" name="birthday">

            <label class="form-label" for="about">О себе</label>
            <textarea class="form-input" v-model="user.about" name="about" rows=8></textarea>
          </div>
          <button id="edit-btn" class="btn" v-on:click="edit()">Изменить</button>
        </div>

        <div class="column col-4">
          <form class="form-group" ref="avatar">
            <label class="form-label" for="avatar">Аватар</label>
            <input class="form-input" type="file" name="file">
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

Moment.locale('ru')

export default {
  props: ['user'],
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
      this.$parent.editUser(this.user)
    },
    editAvatar: function () {
      this.$parent.editAvatar(new FormData(this.$refs.avatar))
    }
  }
}
</script>

<style scoped>
</style>
