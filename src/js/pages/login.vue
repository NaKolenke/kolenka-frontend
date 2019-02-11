<template>
  <div class="container">
    <div class="columns">
      <div id="login" class="column col-6 col-mx-auto">
        <h1>Войти</h1>
        <div class="form-group">
          <label class="form-label" for="text">Имя пользователя</label>
          <input class="form-input" v-model="username" name="login">
          <br>
          <div class="toast toast-error" v-if="usernameError">{{ usernameError }}</div>

          <label class="form-label" for="password">Пароль</label>
          <input class="form-input" v-model="password" name="password" type="password">
          <br>
          <div class="toast toast-error" v-if="passwordError">{{ passwordError }}</div>

          <button id="login-btn" class="btn" v-on:click="login()">Войти</button>

          <br>
          <br>
          <p>Еще нет учетной записи?
            <router-link to="/register">Зарегистрироваться</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.toast {
  position: relative;
}
</style>


<script>
import config from "./../config.json";
import cookie from "js-cookie";

export default {
  data: function() {
    return {
      username: "",
      password: "",
      usernameError: null,
      passwordError: null
    };
  },
  methods: {
    login: function() {
      if (this.username.length === 0) {
        this.usernameError = "Введите имя пользователя";
      } else {
        this.usernameError = null;
      }

      if (this.password.length === 0) {
        this.passwordError = "Введите пароль";
      } else {
        this.passwordError = null;
      }

      if (this.usernameError || this.passwordError) {
        return;
      }

      fetch(config.apiUrl + "/users/login/", {
        method: "POST",
        body: JSON.stringify({
          username: this.username,
          password: this.password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          if (data.success == 1) {
            this.$root.login(data);
            
            this.$root.showToast("Успешно авторизовался");

            this.$router.replace({ path: "/" });
          } else {
            this.usernameError = "Ошибка авторизации";
          }
        })
        .catch(err => {
          this.usernameError = "Ошибка авторизации";
        });
    }
  }
};
</script>

