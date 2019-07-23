<template>
  <div class="container" style="margin-top: 5%;">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto col-md-12">
        <h1>Восстановление пароля</h1>
        <form method="POST" @submit.prevent="restore" :class="{ 'has-error': !validation.password.success }">
          <div class="form-group">
            <label class="form-label" for="password">Новый пароль</label>
            <input
              type="password"
              class="form-input"
              v-model="password"
              v-validate="validation.password"
              name="password"
              id="password"
              required
            >
            <div class="form-input-hint" v-if="!validation.password.success && validation.showErrors">Ошибка валидации пароля</div>
          </div>

           <div class="form-group">
            <label class="form-label" for="password_repeat">Повторите новый пароль</label>
            <input
              type="password"
              class="form-input"
              v-model="password_repeat"
              name="password_repeat"
              id="password_repeat"
              required
            >
          </div>

          <input type="submit" id="login-btn" class="btn primary" value="Установить новый пароль">
        </form>

        <br>
        <p>
          Еще нет учетной записи? <router-link to="/register">Зарегистрироваться</router-link>
          <br>
          Вспомнили пароль? <router-link to="/login">Войти</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: 'Восстановление доступа'
    }
  },
  data () {
    return {
      ...this.mapData({
        auth: 'auth/data'
      }),
      password: '',
      password_repeat: '',
      validation: {
        password: {
          length: () => this.password.length >= 8,
          sameAsRepeated: () => this.password == this.password_repeat,
          strong: () => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)
        },
        showErrors: false
      }
    }
  },
  methods: {
    restore() {
      if (!this.isValid) {
        this.validation.showErrors = true
        return
      } else {
        this.validation.showErrors = false
      }

      this.$auth
      .recover(this.email)
      .then(() => {
        this.$toast.show('Ссылка для восстановления пароля отправлена на указанную почту')
        this.$router.replace({ path: '/' })
      })
      .catch(err => {
        console.log(err)
        this.$toast.error('Ошибка восстановления пароля')
      })
    }
  },
  computed: {
    isValid() {
      return this.validation.email.success
    }
  }
}
</script>

