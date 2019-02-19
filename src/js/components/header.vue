<template>
  <div id="header">
    <header class="navbar column col-9 col-mx-auto">
      <section class="navbar-section">
        <router-link to="/">НАКОЛЕНКЕ</router-link>
        <router-link to="/blogs">Блоги</router-link>
        <router-link to="/users">Люди</router-link>
        <router-link to="/stream">Активность</router-link>
        <router-link to="/page/about">О сайте</router-link>
      </section>
      <section class="navbar-section column col-6 col-mx-auto">
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
    user: Object
  }
};
</script>

