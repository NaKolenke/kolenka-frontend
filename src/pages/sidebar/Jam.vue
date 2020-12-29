<template>
  <the-sidebar :showTags="false">
    <div v-if="jam">
      <div v-if="user && user.is_admin && jam.status === 0">
        <button class="btn btn-lg my-2" style="width: 100%;" @click="startJam()">Запустить джем</button>
      </div>
      <div v-if="user && user.is_admin && jam.status === 1">
        <button class="btn btn-lg my-2" style="width: 100%;" @click="finishJam()">Завершить джем</button>
      </div>

      <div v-if="user && jam.is_participiating">
        <router-link
          class="btn btn-lg my-2"
          style="width: 100%;"
          :to="{ name: 'my-jam-entry', params:{jamUrl: jam.url}}"
        >Моя заявка</router-link>
      </div>

      <div class="container p-2 s-rounded bg-secondary">
        Критерии оценки:
        <ul>
          <li v-for="criteria in jam.criterias" :key="criteria.id">{{criteria.title}}</li>
        </ul>
      </div>
    </div>
  </the-sidebar>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

import TheSidebar from '@/components/TheSidebar.vue'

export default {
  methods: {
    startJam: function () {
      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/startJam', { url: jamUrl })
        .then(_ => {
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    },
    finishJam: function () {
      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/finishJam', { url: jamUrl })
        .then(_ => {
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
      jam: state => state.jams.current,
    }),
  },
  components: {
    TheSidebar
  }
}
</script>

