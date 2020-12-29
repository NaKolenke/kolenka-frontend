<template>
  <div v-if="jam" class="container">
    <div class="float-left mr-32">
      <jam-logo :jam="jam" />
    </div>

    <div class="jam-header">
      <h3 class="title">
        <router-link :to="{ name: 'jam', params: { jamUrl: jam.url } }">{{
          jam.title
        }}</router-link>
      </h3>
      <div class="hosted text-gray">
        Организовано: {{ jam.creator.name || jam.creator.username }}
        <avatar :user="jam.creator" :size="'sm'" popoverSide="bottom" />

        <router-link
          v-if="user && jam.creator.id === user.id"
          :to="{ name: 'edit-jam', params: { name: jam.url, edit: jam } }"
          class="btn btn-sm mx-2"
        >
          Редактировать
        </router-link>
      </div>

      <jam-dates :jam="jam" />

      <button
        v-if="user && !jam.is_participiating"
        class="btn"
        @click="enterJam()"
      >
        Буду участвовать!
      </button>
      <button
        v-else-if="user && jam.is_participiating"
        class="btn"
        @click="leaveJam()"
      >
        Не буду участвовать
      </button>
    </div>

    <ul class="tab tab-block">
      <li class="tab-item" :class="{ active: $route.name === 'jam' }">
        <router-link :to="{ name: 'jam', params: { name: jam.url } }">
          Описание
        </router-link>
      </li>
      <li class="tab-item" :class="{ active: $route.name === 'jam-entries' }">
        <router-link :to="{ name: 'jam-entries', params: { name: jam.url } }">
          Заявки
        </router-link>
      </li>
      <li
        class="tab-item"
        :class="{ active: $route.name === 'jam-discussion' }"
      >
        <router-link
          :to="{ name: 'jam-discussion', params: { name: jam.url } }"
        >
          Обсуждение
        </router-link>
      </li>
    </ul>

    <router-view></router-view>

    <div class="bottom-padd"></div>
  </div>
</template>

<style lang="scss" scoped>
.jam-header {
  margin-bottom: 32px;
}
</style>

<script>
import { mapState } from 'vuex'
import errors from '@/utils/errors'

import Avatar from '@/components/elements/Avatar.vue'
import JamLogo from '@/components/elements/JamLogo.vue'
import JamDates from '@/components/jams/JamDates.vue'


export default {
  metaInfo () {
    return {
      title: 'Джем'
    }
  },
  data: function () {
    return {
      currentTab: 0
    }
  },
  created () {
    this.refreshJam(this.$route)
  },
  methods: {
    refreshJam () {
      var needToRefresh = false
      if (!this.jam) {
        needToRefresh = true
      } else if (this.jam.url != this.$route.params.jamUrl) {
        needToRefresh = true
      }
      if (!needToRefresh) {
        return
      }

      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/getJam', { url: jamUrl })
        .then(_ => {
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    },
    enterJam () {
      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/enterJam', { url: jamUrl })
        .then(_ => {
          this.$store.dispatch('stopLoading')
        })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))

          this.$store.dispatch('stopLoading')
        })
    },
    leaveJam () {
      this.$store.dispatch('startLoading')

      var jamUrl = this.$route.params.jamUrl
      this.$store.dispatch('jams/leaveJam', { url: jamUrl })
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
      isLoading: state => state.isLoading
    })
  },
  components: {
    JamLogo,
    JamDates,
    Avatar,
  }
}
</script>
