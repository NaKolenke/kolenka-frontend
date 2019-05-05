<template>
  <div class="pagination columns">
    <div class="columns column col-12">
      <div class="page-item" :class="{disabled: !canPaginateBack}">
        <a :href="this.page - 1" @click.prevent="paginateRelative(-1)">назад</a>
      </div>
      <div class="page-item" :class="{disabled: !canPaginateForward}">
        <a :href="this.page + 1" @click.prevent="paginateRelative(1)">вперед</a>
      </div>
    </div>
    <div class="columns column col-12">
      <div class="page-item" :class="{active: page == n}" v-for="n in paginationPages" :key="n">
        <span v-if="n == '...'">{{n}}</span>
        <a v-else :href="n" @click.prevent="paginateTo(n)">{{ n }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page', 'pageCount'],
  methods: {
    paginateRelative: function (offset) {
      this.$parent.paginateRelative(offset)
    },
    paginateTo: function (offset) {
      this.$parent.paginateTo(offset)
    }
  },
  computed: {
    canPaginateBack: function () {
      return this.page > 1
    },
    canPaginateForward: function () {
      return this.page < this.pageCount
    },
    paginationPages: function () {
      const displayedPagesCount = 2 // elements before and after active page

      var start = this.page - displayedPagesCount
      if (start < 1) {
        start = 1
      }

      var end = this.page + displayedPagesCount
      if (end > this.pageCount) {
        end = this.pageCount
      }

      var ret = []
      if (start > 1) {
        ret.push(1)
      }
      if (start > 2) {
        ret.push('...')
      }

      for (var i = start; i <= end; i++) {
        ret.push(i)
      }

      if (end < this.pageCount - 1) {
        ret.push('...')
      }
      if (end < this.pageCount) {
        ret.push(this.pageCount)
      }
      return ret
    }
  }
}
</script>

<style scoped>
.pagination {
  align-items: center;
}
</style>
