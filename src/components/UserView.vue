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

      <div
        class="label label-rounded label-secondary"
      >Заходил последний раз: {{ user.last_active_date | moment }}</div>
      <br />

      <vote
        :rating="user.rating"
        :votedUp="user.user_voted > 0"
        :votedDown="user.user_voted < 0"
        :id="user.id"
        :type="'user'"
      />

      <router-link v-if="canEdit" :to="{ name: 'editUser'}" class="btn btn-primary">
        <i class="icon icon-edit"></i> Редактировать
      </router-link>
      <br v-if="canEdit" />
      <br />
    </div>

    <div v-if="user.achievements.length > 0">
      <h3>
        Награды
        <button
          class="btn btn-action"
          @click="showAchievementsAsList = !showAchievementsAsList"
        >
          <i v-if="showAchievementsAsList" class="icon icon-apps"></i>
          <i v-else class="icon icon-menu"></i>
        </button>
      </h3>

      <achievement
        v-for="item in user.achievements"
        :key="item.id"
        :achievement="item"
        :justIcon="!showAchievementsAsList"
      ></achievement>
    </div>

    <div v-if="user.about" class="card description mt-2">
      <post-body class="card-body" :html="user.about" />
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/elements/Avatar.vue'
import PostBody from '@/components/PostBody.vue'
import Vote from '@/components/Vote.vue'
import Achievement from '@/components/Achievement.vue'

export default {
  props: {
    user: Object, // User object
    canEdit: Boolean // If current user can edit the profile
  },
  data: function () {
    return {
      showAchievementsAsList: false
    };
  },
  components: {
    Avatar,
    PostBody,
    Vote,
    Achievement,
  }
}
</script>

<style scoped>
.description {
  background: #ffe;
  border: none;
}
</style>
