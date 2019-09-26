<template>
  <div v-if="hasNotifications">
    <div class="columns">
      <div class="column col-auto">
        <h2 class="float-left">Уведомления</h2>
      </div>
      <div class="column col">
        <button
          class="btn btn-link float-right"
          @click="markAllAsRead"
          :disabled="unread.length === 0"
        >Отметить все как прочитанные</button>
        <div class="clearfix"></div>
      </div>
    </div>

    <transition-group name="list" tag="div" appear>
      <div
        v-for="item in notifications"
        :key="item.id"
        class="tile tile-centered mb-2 mt-2 list-item"
      >
        <div class="tile-icon">
          <div class="btn btn-link">
            <i v-if="item.is_new" class="icon icon-flag centered"></i>
            <span v-else class="tooltip tooltip-right" data-tooltip="Прочитанное">
              <i class="icon icon-check centered"></i>
            </span>
          </div>
        </div>
        <div class="tile-content">
          <div class="tile-title" v-html="item.text"></div>
          <small class="tile-subtitle text-gray">{{ item.created_date | moment }}</small>
        </div>
        <div v-if="item.is_new" class="tile-action">
          <button
            class="btn btn-link tooltip tooltip-left"
            @click="markAsRead(item.id)"
            data-tooltip="Отметить как прочитанное"
          >
            <i class="icon icon-check"></i>
          </button>
        </div>
      </div>
    </transition-group>
    <button class="btn btn-link tooltip tooltip-left" @click="test()" data-tooltip="Test">
      <i class="icon icon-check"></i>
    </button>
    <pagination-view :page="page" :page-count="pageCount"></pagination-view>
  </div>
  <div v-else class="empty">
    <div class="empty-icon">
      <i class="icon icon-3x icon-flag"></i>
    </div>
    <p class="empty-title h5">У вас нет уведомлений</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import PaginationView from '@/components/PaginationView.vue'
import df from '@/mixins/dataFetch'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Уведомления'
    }
  },
  data () {
    return {
      page: 1,
      pageCount: 1
    }
  },
  dataFetch () {
    this.$Progress.start()

    if (!this.user) {
      this.$router.replace({ path: '/' })
      this.$Progress.finish()
      return Promise.resolve()
    }

    return this.refreshPage(this.$route).then(() => this.$Progress.finish())
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage(to)
    next()
  },
  methods: {
    test () {
      this.$store.dispatch('notifications/test')
    },
    refreshPage (route) {
      this.page = parseInt(route.query.page) || this.page

      return this.$store.dispatch('notifications/getAll', { pagination: new Pagination(this.page) })
        .then(res => {
          this.pageCount = res.meta.page_count
        }).catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    markAsRead (id) {
      this.$store.dispatch('notifications/markAsRead', { ids: [id] })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    markAllAsRead () {
      let ids = this.notifications.map(x => x.id)
      this.$store.dispatch('notifications/markAsRead', { ids: ids })
        .catch(error => {
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'notifications', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'notifications', query: { page: page } })
    }
  },
  computed: {
    hasNotifications () {
      return this.notifications.length > 0
    },
    ...mapState({
      user: state => state.users.me,
      notifications: state => state.notifications.my
    }),
    ...mapGetters({
      unread: 'notifications/unread'
    })
  },
  components: {
    PaginationView
  },
  mixins: [df]
}
</script>

<style scoped>
.list-item {
  transition: all 0.3s;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}
.list-leave-active {
  position: absolute;
}
.list-leave-active .tooltip {
  display: none;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

