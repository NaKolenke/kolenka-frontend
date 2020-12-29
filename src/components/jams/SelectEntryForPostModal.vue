<template>
  <modal
    :open="isShowed"
    :closed="close"
    title="Выберите заявки, которые связаны с этим постом"
    size="lg"
    :hideButtons="true"
  >
    <div class="container">
      <div class="columns">
        <div class="column col-2" v-for="entry in entries" :key="entry.id">
          <div>
            <jam-entry-logo :entry="entry" />
          </div>
          <p>
            {{ entry.title }}
          </p>
          <p>
            <button
              v-if="!isEntrySelected(entry)"
              class="btn btn-success"
              @click="selectEntry(entry)"
            >
              Добавить
            </button>
            <button v-else class="btn btn-error" @click="unselectEntry(entry)">
              Убрать
            </button>
          </p>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import { mapState } from 'vuex'
import Modal from '@/components/elements/Modal.vue'
import JamEntryLogo from '@/components/elements/JamEntryLogo.vue'


import errors from '@/utils/errors'


export default {
  props: {
    isShowed: {
      type: Boolean,
      default: false
    },
    value: Array
  },
  data: function () {
    return {
      entries: [],
    }
  },
  created () {
    this.refreshEntries(this.$route)
  },
  methods: {
    refreshEntries () {
      this.$store.dispatch('startLoading')

      this.$store.dispatch('users/getJamEntriesForUser', { username: this.user.username })
        .then(res => {
          this.entries = res.entries
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    },
    isEntrySelected: function (entry) {
      return this.value.some(e => e.id === entry.id)
    },
    selectEntry: function (entry) {
      this.value.push(entry)
      this.$emit('input', this.value)
    },
    unselectEntry: function (entry) {
      this.value = this.value.filter(e => e.id !== entry.id)
      this.$emit('input', this.value)
    },
    close: function () {
      this.$emit("update:isShowed", false)
    }
  },
  computed: {
    ...mapState({
      user: state => state.users.me,
    })
  },
  components: {
    Modal,
    JamEntryLogo
  }
}
</script>
