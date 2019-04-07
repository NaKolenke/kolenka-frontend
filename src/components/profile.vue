<template>
  <div>
    <div class="user column col-12 py-2">
      <div class="columns">
        <ProfileListItem :user="user"></ProfileListItem>

        <div class="description column col-12 my-2 p-2" v-if="user.about" v-html="user.about"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileListItem from '@/components/profile-item.vue'

export default {
  props: ['user'],
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
  padding: 0px;
}
</style>
