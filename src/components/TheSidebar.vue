<template>
  <div>
    <slot></slot>
    <div v-if="isLoading">
        Загружаем
    </div>
    <div v-else class="side-block">
      <h4>ТЕГИ</h4>
      <span v-for="tag in tags" :key="tag.id">
        <router-link :to="{ name: 'tag', params: { title: tag.title }}" class="text-primary"> {{tag.title}} </router-link>
      </span>

    </div>
  </div>
</template>

<script>
import TagService from '@/services/tag'

export default {
  data: function () {
    return {
      tags: [],
      isLoading: true
    }
  },
  created: function () {
    this.isLoading = true
      TagService.getTags().then(data => {
        this.tags = data.tags.filter( t => t.title.length > 0)
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        console.log(err)
      })
  },
}
</script>


<style scoped>
h4 {
  text-align: right;
}

a {
  text-decoration: none;
  margin-left: 0px;
  margin-right: 6px;
}

.side-block {
  padding: 20px;
  border-radius: 3px;
  background: #7db9e8;
  margin-bottom: 24px;
}
</style>

