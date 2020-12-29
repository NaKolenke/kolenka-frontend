<template>
  <div class="container">
    <div class="float-left mr-32">
      <jam-logo :jam="jam" :size="'xl'" :card="false" />
    </div>
    <div>
      <h3 class="title">
        <router-link :to="{ name: 'jam', params: { jamUrl: jam.url } }">{{ jam.title }}</router-link>
      </h3>

      <div class="hosted text-gray">
        Орагнизовано: {{ jam.creator.name || jam.creator.username}}
        <avatar :user="jam.creator" :size="'sm'" popoverSide="bottom" />

        <router-link
          v-if="user && jam.creator.id === user.id"
          :to="{ name: 'edit-jam', params: { jamUrl: jam.url, edit: jam } }"
          class="btn btn-sm mx-2"
        >Редактировать</router-link>
      </div>

      <jam-dates :jam="jam"></jam-dates>

      <p v-html="jam.short_description"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Avatar from '@/components/elements/Avatar.vue'
import JamLogo from '@/components/elements/JamLogo.vue'
import JamDates from '@/components/jams/JamDates.vue'

export default {
  props: {
    jam: Object
  },
  data () {
    return {

    }
  },

  methods: {

  },
  computed: {
    ...mapState({
      user: state => state.users.me,
    }),
  },
  components: {
    Avatar,
    JamLogo,
    JamDates
  }
}
</script>

<style scoped>
.title {
  line-height: 1rem;
}

.hosted {
  font-size: 0.8rem;
}
</style>
