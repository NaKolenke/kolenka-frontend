<template>
  <the-sidebar :showTags="false">
    <div v-if="user && user.is_admin">
      <router-link :to="{ name: 'new-jam'}" class="btn btn-lg my-2" style="width: 100%;">
        <i class="icon icon-plus"></i> Создать джем
      </router-link>
    </div>
  </the-sidebar>
</template>

<script>
import { mapState } from 'vuex'

import TheSidebar from '@/components/TheSidebar.vue'

export default {
  computed: {
    ...mapState({
      user: state => state.users.me,
    }),
  },
  components: {
    TheSidebar
  }
}
</script>

