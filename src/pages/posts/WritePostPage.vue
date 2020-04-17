<template>
  <div class="container">
    <div class="columns">
      <div class="column col-12 col-mx-auto">
        <write-post />
      </div>
    </div>

    <div class="bottom-padd"></div>
  </div>
</template>

<script>
import WritePost from '@/components/WritePostView.vue'

export default {
  metaInfo () {
    return {
      title: 'Редактирование поста'
    }
  },
  components: {
    WritePost,
  }
}
</script>
