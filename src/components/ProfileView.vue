<template>
  <div class="user column col-12 py-2">
    <div class="columns">
      <div class="column col-10">
        <profile-list-item :user="user"></profile-list-item>
      </div>
      <div class="column col-2">
        <router-link v-if="canEdit" :to="{ name: 'editProfile'}" class="btn"><i class="icon icon-edit"></i> Редактировать</router-link>
      </div>

      <div class="description column col-12 my-2 p-2" v-if="user.about" v-html="user.about"></div>
    </div>
  </div>
</template>

<script>
import ProfileListItem from '@/components/ProfileListItem.vue'

export default {
  props: ['user', 'canEdit'],
  components: {
    ProfileListItem
  }
}
</script>

<style scoped>
.user {
  background: #ffffff;
}

.description {
  background: #ffe;
}
</style>
