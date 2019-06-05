<template>
  <vue-content-loading :width="300" :height="100">
    <circle cx="15" cy="8" r="8" />
    <rect x="30" y="4" rx="2" ry="2" width="100" height="8" />
    <rect x="30" y="16" rx="2" ry="2" width="50" height="4" />

    <rect x="30" y="26" rx="2" ry="2" width="300" height="6" />
    <rect x="30" y="34" rx="2" ry="2" width="300" height="6" />
  </vue-content-loading>
</template>

<script>
import { VueContentLoading } from 'vue-content-loading'

export default {
  components: {
    VueContentLoading
  }
}
</script>

