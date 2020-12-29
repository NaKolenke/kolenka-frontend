<template>
  <the-sidebar :showTags="false">
    <div v-if="entry && jam">
      <div v-if="user && user.id === entry.creator.id">
        <router-link
          class="btn btn-lg my-2"
          style="width: 100%"
          :to="{ name: 'my-jam-entry-edit', params: { jamUrl: entry.jam.url } }"
          >Редактировать заявку</router-link
        >
      </div>
    </div>
  </the-sidebar>
</template>

<script>
import { mapState } from 'vuex'

import TheSidebar from '@/components/TheSidebar.vue'

export default {
  methods: {
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
      jam: state => state.jams.current,
      entry: state => state.jams.currentEntry,
    }),
  },
  components: {
    TheSidebar
  }
}
</script>

