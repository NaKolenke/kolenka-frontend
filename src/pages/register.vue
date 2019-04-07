<template>
  <div class="container">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto">
        <h1>Зарегистрироваться</h1>
        <div class="form-group">
          <label class="form-label" for="text">Имя пользователя</label>
          <input class="form-input" v-model="username" name="login" v-on:keyup.enter="register">
          <br>
          <div class="toast toast-error" v-if="usernameError">{{ usernameError }}</div>

          <label class="form-label" for="text">Почта</label>
          <input class="form-input" v-model="email" name="email" v-on:keyup.enter="register">
          <br>
          <div class="toast toast-error" v-if="emailError">{{ emailError }}</div>

          <label class="form-label" for="text">Отображаемое имя</label>
          <input class="form-input" v-model="name" name="name" v-on:keyup.enter="register">
          <br>
          <div class="toast toast-error" v-if="nameError">{{ nameError }}</div>

          <label class="form-label" for="password">Пароль</label>
          <input
            class="form-input"
            v-model="password"
            name="password"
            type="password"
            v-on:keyup.enter="register"
          >
          <br>
          <div class="toast toast-error" v-if="passwordError">{{ passwordError }}</div>

          <button id="login-btn" class="btn" v-on:click="register()">Зарегистрироваться</button>

          <br>
          <br>
          <p>
            Уже есть учетная запись?
            <router-link to="/login">Войти</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user'

export default {
  data: function () {
    return {
      username: '',
      email: '',
      name: '',
      password: '',
      usernameError: null,
      emailError: null,
      nameError: null,
      passwordError: null
    }
  },
  methods: {
    register: function () {
      if (this.username.length === 0) {
        this.usernameError = 'Введите имя пользователя'
      } else {
        this.usernameError = null
      }

      if (this.email.length === 0) {
        this.emailError = 'Введите почтовый адрес'
      } else {
        this.emailError = null
      }

      if (this.name.length === 0) {
        this.nameError = 'Введите имя'
      } else {
        this.nameError = null
      }

      if (this.password.length === 0) {
        this.passwordError = 'Введите пароль'
      } else {
        this.passwordError = null
      }

      if (
        this.usernameError ||
        this.emailError ||
        this.nameError ||
        this.passwordError
      ) {
        return
      }

      UserService
        .register(this.username, this.name, this.email, this.password)
        .then(data => {
          if (data.success === 1) {
            this.$root.refreshUser()

            this.$root.showToast('Успешно зарегистрировался')

            this.$router.replace({ path: '/' })
          } else {
            this.usernameError = 'Ошибка регистрации'
          }
        })
        .catch(err => {
          console.log(err)

          this.usernameError = 'Ошибка регистрации'
        })
    }
  }
}
</script>
<style scoped>
.toast {
  position: relative;
}
</style>
