<template>
  <div id="app">
    <header-component v-bind:user="user"></header-component >
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/header.vue'

export default {
  name: 'App',
  data: function () {
    return {
      user: undefined
    }
  },
  components: {
    HeaderComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
