<template>
  <div class="container" style="margin-top: 5%;">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto col-md-12">
        <h1>Восстановление пароля</h1>
        <form
          method="POST"
          @submit.prevent="restore"
          :class="{ 'has-error': !validation.email.success }"
        >
          <div class="form-group">
            <label class="form-label" for="email">Адрес электронной почты</label>
            <input
              type="email"
              class="form-input"
              v-model="email"
              v-validate="validation.email"
              name="email"
              id="email"
              inputmode="email"
              required
            />
            <div
              class="form-input-hint"
              v-if="!validation.email.success && validation.showErrors"
            >Неверный адрес электронной почты</div>
          </div>

          <input type="submit" id="login-btn" class="btn primary" value="Отправить" />
        </form>

        <br />
        <p>
          Еще нет учетной записи?
          <router-link to="/register">Зарегистрироваться</router-link>
          <br />Вспомнили пароль?
          <router-link to="/login">Войти</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Восстановление доступа'
    }
  },
  data () {
    return {
      email: '',
      validation: {
        email: {
          length: () => this.email.length >= 5,
          isEmail: () => /\S+@\S+\.\S+/.test(this.email)
        },
        showErrors: false
      }
    }
  },
  methods: {
    restore () {
      if (!this.isValid) {
        this.validation.showErrors = true
        return
      } else {
        this.validation.showErrors = false
      }

      this.$store.dispatch('auth/recover', { email: this.email })
        .then(() => {
          this.$toast.show('Ссылка для восстановления пароля отправлена на указанную почту')
          this.$router.replace({ path: '/' })
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    isValid () {
      return this.validation.email.success
    }
  }
}
</script>

