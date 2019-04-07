<template>
  <div id="header">
    <header class="navbar column col-9 col-mx-auto">
      <section class="navbar-section">
        <router-link to="/"><img id="logo" src="/static/icon.png" /></router-link>
        <router-link to="/">НАКОЛЕНКЕ</router-link>
        <router-link to="/blogs">Блоги</router-link>
        <router-link to="/users">Люди</router-link>
        <router-link to="/stream">Активность</router-link>
      </section>
      <section class="navbar-section">
        <router-link to="/page/about">О сайте</router-link>
        <p id="version">Версия {{version}}</p>

        <template v-if="user">
          <router-link :to="{ name: 'profile', params: { user: user.login }}">{{ user.name }}</router-link>
          <router-link to="/logout">Выйти</router-link>
        </template>
        <template v-else>
          <router-link to="/register">Регистрация</router-link>
          <router-link to="/login">Войти</router-link>
        </template>
      </section>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
    version: String
  }
}
</script>

<style scoped>
#header {
  background-color: #323a45;
}

header a {
  color: #ffffff;
  margin: 0 20px 0 0;
}

#version {
  color: #5a616d;
  margin: 0 20px 0 0;
  font-size: .6rem;
}

#logo {
  height: 48px;
}
</style>
