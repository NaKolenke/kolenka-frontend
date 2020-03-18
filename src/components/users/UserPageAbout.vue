<template>
  <post-body v-if="user.about" :html="user.about" class="mx-2" />
  <p v-else>Пользователь еще не заполнил информацию о себе</p>
</template>


<script>
import PostBody from '@/components/PostBody.vue'

export default {
  props: {
    user: Object
  },
  components: {
    PostBody
  }
}
</script>
