<template>
  <the-sidebar>
    <side-block title="ENDPOINTS">
      <ul style="list-style: none;margin: 0">
        <li v-for="item in endpoints" :key="item.method + item.url">
          <b>{{ item.method.join(', ') }}</b>
          <a :href="'#' + item.method + item.url">{{item.url}}</a>
        </li>
      </ul>
    </side-block>
  </the-sidebar>
</template>

<script>
import { mapState } from 'vuex'
import TheSidebar from '@/components/TheSidebar.vue'
import SideBlock from '@/components/elements/SidebarBlock.vue'

export default {
  computed: {
    ...mapState({
      endpoints: state => state.doc.endpoints
    }),
  },
  components: {
    TheSidebar,
    SideBlock
  }
}
</script>
