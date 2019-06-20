<template>
  <div class="container" style="margin-top: 15%;">
    <div class="columns">
      <div class="column col-6 col-mx-auto col-md-12">
        <h1>Регистрация</h1>
        <form method="POST" @submit.prevent="register" :class="{ 'has-error': !isValid && validation.showErrors }">
          <div class="form-group">
            <label class="form-label" for="username">Имя пользователя</label>
            <input 
              class="form-input" 
              v-model="username"
              v-validate="validation.username"
              name="username" 
              id="username" 
              v-on:keyup.enter="register"
              required
            >
            <div class="form-input-hint" v-if="!validation.username.success && validation.showErrors">Неверное имя пользователя</div>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="email">Адрес электронной почты</label>
            <input 
              class="form-input" 
              v-model="email" 
              v-validate="validation.email"
              name="email" 
              id="email" 
              v-on:keyup.enter="register"
              required
            >
            <div class="form-input-hint" v-if="!validation.email.success && validation.showErrors">Неверный адрес электронной почты</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="name">Отображаемое имя</label>
            <input 
              class="form-input" 
              v-model="name" 
              v-validate="validation.name"
              name="name" 
              id="name" 
              v-on:keyup.enter="register"
              required
            >
            <div class="form-input-hint" v-if="!validation.name.success && validation.showErrors">Неверное имя</div>
          </div>

          <div class="form-group">
            <label class="form-label" for="password">Пароль</label>
            <input
              class="form-input"
              v-model="password"
              v-validate="validation.password"
              name="password"
              type="password"
              id="password"
              v-on:keyup.enter="register"
              required
            >
            <div class="form-input-hint" v-if="!validation.password.success && validation.showErrors">Неверный пароль</div>
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
export default {
  metaInfo() {
    return {
      title: 'Регистрация'
    }
  },
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      username: '',
      email: '',
      name: '',
      password: '',
      validation: {
        username: {
          length: () => this.username.length >= 3
        },
        email: {
          length: () => this.email.length >= 5,
          isEmail: () => /\S+@\S+\.\S+/.test(this.email)
        },
        name: {
          length: () => this.name.length >= 3
        },
        password: {
          length: () => this.password.length >= 4
        },
        showErrors: false
      }
    }
  },
  mounted () {
    if (this.auth.user != null) {
      this.$router.replace({ path: '/' })
    }
  },
  methods: {
    register () {
      if (!this.isValid) {
        this.validation.showErrors = true
        return
      } else {
        this.validation.showErrors = false
      }

      this.$auth
      .register(this.username, this.name, this.email, this.password)
      .then(() => {
        this.$toast.show('Успешно зарегистрировался')
        this.$router.replace({ path: '/' })
      })
      .catch(err => {
        console.log(err)
        this.$toast.error('Ошибка регистрации')
      })
    }
  },
  computed: {
    isValid() {
      return this.validation.username.success &&
        this.validation.email.success &&
        this.validation.name.success &&
        this.validation.password.success
    }
  }
}
</script>