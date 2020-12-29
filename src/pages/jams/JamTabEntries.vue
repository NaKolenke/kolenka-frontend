<template>
  <div v-if="jam" class="container">
    <div v-if="jamEntries" class="columns">
      <div class="column col-2" v-for="entry in jamEntries" :key="entry.id">
        <router-link
          :to="{
            name: 'jam-entry',
            params: { jamUrl: entry.jam.url, entryUrl: entry.url },
          }"
          class="text-center"
        >
          <div>
            <jam-entry-logo :entry="entry" />
          </div>
          <p>
            {{ entry.title }}
            <small
              v-if="user && user.id === entry.creator.id"
              class="label label-secondary h6"
            >
              моя заявка
            </small>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

import JamEntryLogo from '@/components/elements/JamEntryLogo.vue'

export default {
  metaInfo () {
    return {
      title: 'Заявки'
    }
  },
  data: function () {
    return {
    }
  },
  created () {
    this.refreshEntries(this.$route)
  },
  methods: {
    refreshEntries () {
      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/getJamEntries', { url: jamUrl })
        .then(_ => {
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    },
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
      jam: state => state.jams.current,
      jamEntries: state => state.jams.entries,
      isLoading: state => state.isLoading
    })
  },
  components: {
    JamEntryLogo
  }
}
</script>
