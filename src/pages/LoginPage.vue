<template>
  <div class="container" style="margin-top: 5%;">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto col-md-12">
        <h1>Войти</h1>
        <form
          method="POST"
          @submit.prevent="login"
          :class="{ 'has-error': !isValid && validation.showErrors }"
        >
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
            />
            <div
              class="form-input-hint"
              v-if="!validation.username.success && validation.showErrors"
            >Неверное имя пользователя</div>
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
            />
            <div
              class="form-input-hint"
              v-if="!validation.password.success && validation.showErrors"
            >Неверный пароль</div>
          </div>

          <div v-if="isLoading" class="loading"></div>
          <input v-else type="submit" id="login-btn" class="btn primary" value="Войти" />
        </form>

        <br />
        <p>
          Еще нет учетной записи?
          <router-link to="/register">Зарегистрироваться</router-link>
          <br />Забыли пароль?
          <router-link to="/restore">Восстановить</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Вход'
    }
  },
  data () {
    return {
      username: '',
      password: '',
      validation: {
        username: {
          length: () => this.username.length > 0
        },
        password: {
          length: () => this.password.length >= 4
        },
        showErrors: false
      },
      isLoading: false
    }
  },
  mounted () {
    if (this.user != null) {
      this.$router.replace({ path: '/' })
    }
  },
  methods: {
    login () {
      if (!this.isValid) {
        return this.validation.showErrors = true
      } else {
        this.validation.showErrors = false
      }

      this.isLoading = true
      this.$store.dispatch('auth/login', { username: this.username, password: this.password })
        .then(() => {
          return this.$parent.refreshUserData()
        }).then(() => {
          this.$toast.show('Авторизация успешна')
          this.$router.replace({ path: '/' })
          this.isLoading = false
        }).catch((error) => {
          this.isLoading = false

          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
    isValid () {
      return this.validation.username.success &&
        this.validation.password.success
    }
  }
}
</script>
