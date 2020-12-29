<template>
  <div :class="{ 'loading loading-lg': isLoading }">
    <div v-if="jams && jams.length > 0">
      <h3>Этот пользователь организовал джемы:</h3>
      <jam-card v-for="jam in jams" :key="jam.id" :jam="jam" />
    </div>

    <div v-if="entries && entries.length > 0" class="container">
      <h3>Участие в джемах</h3>
      <div v-if="entries" class="columns">
        <div class="column col-2" v-for="entry in entries" :key="entry.id">
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
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import JamEntryLogo from '@/components/elements/JamEntryLogo.vue'
import JamCard from '@/components/cards/JamCard.vue'

import errors from '@/utils/errors'


export default {
  props: {
    user: Object,
  },
  data: function () {
    return {
      jams: null,
      entries: null,
      isLoading: true
    }
  },
  mounted: function () {
    this.refreshJamsAndEntries()
  },
  beforeDestroy: function () {
    this.jams = null
    this.entries = null
  },
  methods: {
    refreshJamsAndEntries: function () {
      this.jams = []
      this.entries = []
      this.isLoading = true

      this.$store.dispatch('users/getJamsOrganizedByUser', { username: this.user.username })
        .then(res => {
          this.jams = res.jams
          return this.$store.dispatch('users/getJamEntriesForUser', { username: this.user.username })
        })
        .then(res => {
          this.entries = res.entries
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },

  },
  components: {
    JamEntryLogo,
    JamCard
  }
}
</script>
