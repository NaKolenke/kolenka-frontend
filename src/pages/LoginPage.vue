<template>
  <div class="container">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto">
        <h1>Войти</h1>
        <form method="POST" @submit.prevent="login">
          <div class="form-group">
            <label class="form-label" for="username">Имя пользователя</label>
            <input 
              class="form-input" 
              v-model="username" 
              name="username" 
              id="username"
            >
            <div class="toast toast-error" v-if="usernameError">{{ usernameError }}</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input
              class="form-input"
              v-model="password"
              name="password"
              type="password"
              id="password"
            >
            <div class="toast toast-error" v-if="passwordError">{{ passwordError }}</div>
          </div>

          <input type="submit" id="login-btn" class="btn primary">
        </form>
        
        <br>
        <br>
        <p>
          Еще нет учетной записи?
          <router-link to="/register">Зарегистрироваться</router-link>
        </p>
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
      password: '',
      usernameError: null,
      passwordError: null
    }
  },
  mounted: function () {
    UserService
      .getSelf()
      .then(data => {
        if (data.success === 1) {
          this.$router.replace({ path: '/' })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    login: function () {
      if (this.username.length === 0) {
        this.usernameError = 'Введите имя пользователя'
      } else {
        this.usernameError = null
      }

      if (this.password.length === 0) {
        this.passwordError = 'Введите пароль'
      } else {
        this.passwordError = null
      }

      if (this.usernameError || this.passwordError) {
        return
      }

      UserService
        .login(this.username, this.password)
        .then(data => {
          if (data.success === 1) {
            this.$parent.refreshUser()

            this.$toast.show('Успешно авторизовался')

            this.$router.replace({ path: '/' })
          } else {
            this.usernameError = 'Ошибка авторизации'
          }
        })
        .catch(err => {
          console.log(err)

          this.usernameError = 'Ошибка авторизации'
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
