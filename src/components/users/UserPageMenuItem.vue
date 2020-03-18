<template>
  <li class="nav-item" :class="{ 'active': currentTab == index }">
    <button class="btn btn-link" :class="{ 'active':  currentTab == index}" @click="navTo">
      {{title}}
      <span
        v-if="badge != null || badge > 0"
        class="label label-rounded label-primary mx-2"
      >{{ badge }}</span>
    </button>
  </li>
</template>


<script>
export default {
  props: {
    index: Number,
    title: String,
    badge: [String, Number],
    currentTab: Number,
  },
  methods: {
    navTo: function () {
      this.$emit('navTo', this.index)
    }
  }
}
</script>

<style scoped>
.label {
  font-size: 0.5rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  position: relative;
  top: -2px;
}
</style>
