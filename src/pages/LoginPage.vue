<template>
  <div class="container" style="margin-top: 20%;">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto col-md-12">
        <h1>Войти</h1>
        <form method="POST" @submit.prevent="login" :class="{ 'has-error': !isValid && validation.showErrors }">
          <div class="form-group">
            <label class="form-label" for="username">Имя пользователя</label>
            <input
              type="text"
              class="form-input"
              v-model="username"
              v-validate="validation.username"
              name="username"
              id="username"
              required
            >
            <div class="form-input-hint" v-if="!validation.username.success && validation.showErrors">Неверное имя пользователя</div>
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
              required
            >
            <div class="form-input-hint" v-if="!validation.password.success && validation.showErrors">Неверный пароль</div>
          </div>

          <input type="submit" id="login-btn" class="btn primary" value="Войти">
        </form>

        <br>
        <p>
          Еще нет учетной записи? <router-link to="/register">Зарегистрироваться</router-link>
          <br>
          Забыли пароль? <router-link to="/restore">Восстановить</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Вход'
    }
  },
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      username: '',
      password: '',
      validation: {
        username: {
          length: () => this.username.length >= 3
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
    login () {
      if (!this.isValid) {
        this.validation.showErrors = true
        return
      } else {
        this.validation.showErrors = false
      }

      this.$auth
      .login(this.username, this.password)
      .then(() => {
        this.$toast.show('Авторизация успешна')
        this.$router.replace({ path: '/' })
      })
      .then(() => this.$blogs.getUserBlogs(this.auth.user.username, { limit: 100 }, true))
      .catch(() => {
        this.$toast.error('Ошибка авторизации')
      })
    }
  },
  computed: {
    isValid() {
      return this.validation.username.success &&
             this.validation.password.success
    }
  }
}
</script>
