<template>
  <div class="container" style="margin-top: 5%;">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto col-md-12">
        <h1>Восстановление пароля</h1>
        <form method="POST" @submit.prevent="restore" :class="{ 'has-error': !isValid }">
          <p>Пароль должен отвечать следующим требованиям: <br>
            * Длина пароля должна быть не менее 8 символов.<br>
            * Пароль должен состоять из букв латинского алфавита (A-z) и арабских цифр (0-9).</p>
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
            <label class="form-label" for="repeat">Повторите новый пароль</label>
            <input
              type="password"
              class="form-input"
              v-model="repeat"
              v-validate="validation.repeat"
              name="repeat"
              id="repeat"
              required
            >
            <div class="form-input-hint" v-if="!validation.repeat.success && validation.showErrors">Пароли не совпадают</div>
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
      repeat: '',
      validation: {
        password: {
          length: () => this.password.length >= 8,
          strong: () => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)
        },
        repeat: {
          sameAsRepeated: () => this.password == this.repeat
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
      .setPassword(this.password, this.$route.query.token)
      .then(() => {
        this.$toast.show('Ваш пароль успешно изменен')
        this.$router.replace({ path: '/' })
      })
      .catch(err => {
        console.log(err)
        this.$toast.error('Ошибка при изменении пароля')
      })
    }
  },
  computed: {
    isValid() {
      return this.validation.password.success && this.validation.repeat.success
    }
  }
}
</script>

