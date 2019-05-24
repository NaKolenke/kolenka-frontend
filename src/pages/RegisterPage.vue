<template>
  <div class="container">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto">
        <h1>Зарегистрироваться</h1>
        <form method="POST" @submit.prevent="register">
          <div class="form-group">
            <label class="form-label" for="username">Имя пользователя</label>
            <input 
              class="form-input" 
              v-model="username" 
              name="username" 
              id="username" 
              v-on:keyup.enter="register"
              required
            >
            <div class="toast toast-error" v-if="usernameError">{{ usernameError }}</div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Адрес электронной почты</label>
            <input 
              class="form-input" 
              v-model="email" 
              name="email" 
              id="email" 
              v-on:keyup.enter="register"
              required
            >
            <div class="toast toast-error" v-if="emailError">{{ emailError }}</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="name">Отображаемое имя</label>
            <input 
              class="form-input" 
              v-model="name" 
              name="name" 
              id="name" 
              v-on:keyup.enter="register"
              required
            >
            <div class="toast toast-error" v-if="nameError">{{ nameError }}</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input
              class="form-input"
              v-model="password"
              name="password"
              type="password"
              id="password"
              v-on:keyup.enter="register"
              required
            >
            <div class="toast toast-error" v-if="passwordError">{{ passwordError }}</div>
          </div>

          <input type="submit" id="login-btn" class="btn btn-primary" v-on:click="register()" value="Зарегистрироваться">

          <br>
          <br>
          <p>
            Уже есть учетная запись?
            <router-link to="/login">Войти</router-link>
          </p>
        </form>
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
            this.$parent.refreshUser()

            this.$toast.show('Успешно зарегистрировался')

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
