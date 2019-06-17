<template>
  <div v-if="notifications.length > 0">
    <transition-group name="list" tag="div" appear>      
      <div v-for="item in notifications" :key="item.id" class="tile tile-centered mb-2 mt-2 list-item">
        <div class="tile-icon">
          <div class="btn btn-link">
            <i class="icon icon-flag centered"></i>
          </div>
        </div>
        <div class="tile-content">
          <div class="tile-title">{{ item.text }}</div>
          <small class="tile-subtitle text-gray">{{ item.created_date | moment }}</small>
        </div>
        <div class="tile-action">
          <button class="btn btn-link tooltip tooltip-left" @click="markAsRead(item.id)" data-tooltip="Отметить как прочитанное">
            <i class="icon icon-check"></i>
          </button>
        </div>
      </div>
    </transition-group>
  </div>
  <div v-else class="empty">
    <div class="empty-icon">
      <i class="icon icon-3x icon-flag"></i>
    </div>
    <p class="empty-title h5">У вас нет уведомлений</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ...this.mapData({
        notifications: 'notifications/everything'
      })
    }
  },
  methods: {
    markAsRead(id) {
      this.$notifications.markAsRead([ id ]).then(() => {
        // ...
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.list-item {
  transition: all 0.3s;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}
.list-leave-active {
  position: absolute;
}
.list-leave-active .tooltip {
  display: none;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

