<template>
  <div class="container">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto">
        <h1>Войти</h1>
        <form method="POST" @submit.prevent="login" :class="{ 'has-error': !validation.username.success || !validation.password.success }">
          <div class="form-group">
            <label class="form-label" for="username">Имя пользователя</label>
            <input 
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

          <input type="submit" id="login-btn" class="btn primary">
        </form>
        
        <br>
        <p>Еще нет учетной записи? <router-link to="/register">Зарегистрироваться</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
      if (!this.validation.username.success ||
          !this.validation.password.success) {
            this.validation.showErrors = true
            return
      } else {
        this.validation.showErrors = false
      }

      this.$auth.login(this.username, this.password).then(() => {
        this.$toast.show('Успешно авторизовался')
        this.$router.replace({ path: '/' })
      }).catch(() => {
        this.$toast.error('Ошибка авторизации')
      })
    }
  }
}
</script>
