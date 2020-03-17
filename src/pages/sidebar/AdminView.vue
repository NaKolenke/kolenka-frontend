<template>
  <the-sidebar :showTags="false">
    <side-block>
      <ul class="menu">
        <li class="divider" data-content="РАЗДЕЛЫ"></li>
        <li class="menu-item">
          <router-link
            :class="{ 'active': activeUrl == 'admin-activity' }"
            :to="{ name: 'admin-activity' }"
          >Активность</router-link>
        </li>
        <li class="menu-item">
          <router-link
            :class="{ 'active': activeUrl == 'admin-stickers' }"
            :to="{ name: 'admin-stickers' }"
          >Стикеры</router-link>
        </li>
        <li class="menu-item">
          <router-link
            :class="{ 'active': activeUrl == 'admin-achievements' }"
            :to="{ name: 'admin-achievements' }"
          >Награды</router-link>
        </li>
      </ul>
    </side-block>
  </the-sidebar>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'
import SideBlock from '@/components/elements/SidebarBlock.vue'

export default {
  computed: {
    activeUrl () {
      return this.$route.name
    }
  },
  components: {
    TheSidebar,
    SideBlock
  }
}
</script>
