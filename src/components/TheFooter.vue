<template>
  <div class="text-gray my-2 footer">
    <div class="container">
      <div class="columns">
        <div class="column col-9 col-mx-auto col-xl-11 col-md-12">
          kolenka.net, {{ new Date().getFullYear() }},
          <template v-if="user">
            <router-link to="/feedback" class="tooltip tooltip-top" :data-tooltip="feedbackTooltip">
              <small id="version">Версия {{version}}</small>
            </router-link>
          </template>
          <template v-else>
            <small id="version">Версия {{version}}</small>
          </template>

          <small class="mx-2">
            <a href="/posts/usloviya-predostavleniya-sajta">Условия предоставления сайта</a>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    version: String,
  },
  data: function () {
    return {
      feedbackTooltip: ''
    }
  },
  created () {
    this.refreshFeedbackTooltip()
  },
  methods: {
    refreshFeedbackTooltip () {
      if (this.isAdmin) {
        this.$store.dispatch('feedback/getList')
          .then(data => {
            let newFeedbackCount = data.feedback.filter(f => !f.is_resolved).length
            if (newFeedbackCount > 0) {
              this.feedbackTooltip = 'Есть ' + newFeedbackCount + ' новых отзывов'
            } else {
              this.feedbackTooltip = 'Нет новых отзывов'
            }
          }).catch(err => {
            this.$log.error(err)
            this.feedbackTooltip = 'Не удалось получить список отзывов'
          })
      } else {
        this.feedbackTooltip = 'Тут вы можете оставить комменатрий по работе сайта'
      }
    },
  },
  computed: {
    ...mapState({
      user: state => state.users.me
    }),
    isAdmin: function () {
      if (!this.user) {
        return false
      }
      return this.user.is_admin
    },
  },
}
</script>
<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>

