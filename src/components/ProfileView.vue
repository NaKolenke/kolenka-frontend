<template>
  <div>
    <div class="text-center">
      <avatar :user="user" size="xl" :card="false" :badge="user.is_admin ? 'Администратор' : false" />
      <h4 class="mt-2" style="margin-bottom: 0">
        <router-link :to="{ name: 'profile', params: { user: user.username }}">{{ user.username }}</router-link>
      </h4>
      <div>{{user.name}}</div>
      <router-link v-if="canEdit" :to="{ name: 'editProfile'}" class="btn btn-primary"><i class="icon icon-edit"></i> Редактировать</router-link>
      <br v-if="canEdit">
      <br>
      <span class="label label-rounded label-secondary">Заходил последний раз: {{ user.last_active_date | moment }}</span>
      <br>
    </div>

    <div v-if="user.about" class="card description mt-2">
      <div class="card-body" v-html="user.about"></div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/elements/Avatar.vue'

export default {
  props: {
    user: Object, // User object
    canEdit: Boolean // If current user can edit the profile
  },
  components: {
    Avatar
  }
}
</script>

<style scoped>
.description {
  background: #ffe;
  border: none;
}
</style>
