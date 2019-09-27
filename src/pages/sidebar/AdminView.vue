<template>
  <the-sidebar :showTags="false">
    <side-block title="Разделы">
      <ul class="nav">
        <li class="nav-item" :class="{ 'active': activeUrl == 'admin-activity' }">
          <router-link :to="{ name: 'admin-activity' }">Активность</router-link>
        </li>
        <li class="nav-item" :class="{ 'active': activeUrl == 'admin-stickers' }">
          <router-link :to="{ name: 'admin-stickers' }">Стикеры</router-link>
        </li>
      </ul>
    </side-block>
    <side-block v-if="activeUrl == 'admin-stickers'" title="Добавить стикер">
      <add-sticker />
    </side-block>
  </the-sidebar>
</template>

<script>
import TheSidebar from '@/components/TheSidebar.vue'
import SideBlock from '@/components/elements/SidebarBlock.vue'
import AddSticker from '@/components/AddStickerView.vue'

export default {
  computed: {
    activeUrl () {
      return this.$route.name
    }
  },
  components: {
    TheSidebar,
    SideBlock,
    AddSticker
  }
}
</script>

<style scoped lang="scss">
.side-block {
  background-color: white;
}
</style>
