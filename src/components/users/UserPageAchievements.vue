<template>
  <div>
    <achievement
      v-for="item in user.achievements"
      :key="item.id"
      :achievement="item"
      :justIcon="false"
    ></achievement>
  </div>
</template>


<script>
import Achievement from '@/components/Achievement.vue'

export default {
  props: {
    user: Object
  },
  components: {
    Achievement
  }
}
</script>
