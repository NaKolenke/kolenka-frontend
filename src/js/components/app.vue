<template>
  <div>
    <HeaderComponent v-bind:user="user"></HeaderComponent>

    <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from "vue-router";
import HeaderComponent from "./header.vue";

export default {
  components: {
    HeaderComponent
  },
  props: {
    user: Object
  }
};
</script>
