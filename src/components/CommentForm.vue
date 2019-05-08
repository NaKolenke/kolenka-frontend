<template>
  <form method="POST" @submit.prevent="send">
    <textarea class="form-input" placeholder="Комментарий" rows="3" v-model="message"></textarea>
    <input class="btn btn-primary" type="submit" value="Отправить" />
  </form>
</template>

<script>
import PostService from '@/services/post'

export default {
  props: [ 'postUrl' ],
  data() {
    return {
      message: ""
    }
  },
  methods: {
    send() {
      PostService.postComment(this.postUrl, this.message).then(data => {
        console.log(data)
      })
    }
  }
}
</script>

