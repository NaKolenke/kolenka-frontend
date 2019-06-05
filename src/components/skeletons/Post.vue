<template>
  <vue-content-loading :width="300" :height="200">
    <rect x="0" y="4" rx="2" ry="2" width="150" height="4" />
    <rect x="0" y="14" rx="2" ry="2" width="240" height="16" />

    <rect v-for="i in (1, 17)" :key="i" x="0" :y="30 + i * 8" rx="2" ry="2" :width="getRandom(200, 300)" height="6" />

    <circle cx="8" cy="186" r="8" />
    <rect x="22" y="182" rx="2" ry="2" width="100" height="8" />
  </vue-content-loading>
</template>

<script>
import { VueContentLoading } from 'vue-content-loading'
import { getRandomInt } from '@/utils/vanilla'

export default {
  methods: {
    getRandom(min, max) {
      return getRandomInt(min, max)
    }
  },
  components: {
    VueContentLoading
  }
}
</script>