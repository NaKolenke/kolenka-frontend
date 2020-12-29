<template>
  <ul class="nav">
    <user-page-menu-item
      :index="0"
      :currentTab="currentTab"
      @navTo="navTo"
      title="О себе"
    />

    <user-page-menu-item
      :index="1"
      v-if="user.achievements.length > 0"
      :currentTab="currentTab"
      @navTo="navTo"
      title="Награды"
      :badge="user.achievements.length"
    />

    <user-page-menu-item
      :index="2"
      :currentTab="currentTab"
      @navTo="navTo"
      title="Блоги"
    />

    <user-page-menu-item
      :index="3"
      :currentTab="currentTab"
      @navTo="navTo"
      title="Посты"
    />

    <user-page-menu-item
      :index="4"
      :currentTab="currentTab"
      @navTo="navTo"
      title="Джемы"
    />
  </ul>
</template>


<script>
import UserPageMenuItem from '@/components/users/UserPageMenuItem.vue'

export default {
  props: {
    user: Object
  },
  data: function () {
    return {
      currentTab: 0
    }
  },
  methods: {
    navTo: function (index) {
      this.currentTab = index
      this.$emit('navTo', index)
    }
  },
  computed: {
    activeUrl () {
      return this.$route.name
    }
  },
  components: {
    UserPageMenuItem
  }
}
</script>
