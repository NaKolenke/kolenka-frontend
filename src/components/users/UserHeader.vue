<template>
  <div>
    <div class="text-center">
      <avatar
        :user="user"
        size="xl"
        :card="false"
        :badge="user.is_admin ? 'Администратор' : false"
      />

      <h4 class="mt-2" style="margin-bottom: 0">
        <router-link :to="{ name: 'user', params: { user: user.username }}">{{ user.username }}</router-link>
      </h4>
      <div>{{user.name}}</div>

      <p class="text-gray">
        Был в сети
        <br />
        {{ user.last_active_date | moment }}
      </p>
      <vote
        :rating="user.rating"
        :votedUp="user.user_voted > 0"
        :votedDown="user.user_voted < 0"
        :id="user.id"
        :type="'user'"
      />

      <router-link v-if="canEdit" :to="{ name: 'editUser'}" class="btn btn-sm my-2">
        <i class="icon icon-edit"></i> Редактировать профиль
      </router-link>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/elements/Avatar.vue'
import Vote from '@/components/Vote.vue'

export default {
  props: {
    user: Object, // User object
    canEdit: Boolean // If current user can edit the profile
  },
  data: function () {
    return {
    };
  },
  components: {
    Avatar,
    Vote,
  }
}
</script>

<style scoped>
</style>
