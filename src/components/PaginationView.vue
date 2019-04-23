<template>
  <div class="pagination columns">
    <div class="columns column col-12">
      <div class="page-item" :class="{disabled: !canPaginateBack}"><a v-on:click="paginate(-1)">назад</a></div>
      <div class="page-item" :class="{disabled: !canPaginateForward}"><a v-on:click="paginate(1)">вперед</a></div>
    </div>
    <div class="columns column col-12">
      <div class="column col-1">1</div>
      <div class="column col-1">2</div>
      <div class="column col-1">3</div>
      <div class="column col-1">4</div>
    </div>
  </div>
</template>

<script>
// import AvatarView from '@/components/AvatarView.vue'

export default {
  props: ['page', 'pageCount'],
  methods: {
    paginate: function (offset) {
      this.$parent.paginate(offset)
    }
  },
  computed: {
    canPaginateBack: function () {
      return this.page > 1
    },
    canPaginateForward: function () {
      return this.page < this.pageCount
    }
  }
}
</script>

<style scoped>
.pagination {
  align-items: center;
}
</style>
