<template>
  <div class="pagination columns">
    <div class="columns column col-12">
      <div class="page-item" :class="{disabled: !canPaginateBack}">
        <a :href="paginationPage(page - 1)" @click.prevent="paginateRelative(-1)">назад</a>
      </div>
      <div class="page-item" :class="{disabled: !canPaginateForward}">
        <a :href="paginationPage(page + 1)" @click.prevent="paginateRelative(1)">вперед</a>
      </div>
    </div>
    <div class="columns column col-12">
      <div class="page-item" :class="{ active: page == n }" v-for="n in paginationPages" :key="n">
        <span v-if="n == '...'">{{ n }}</span>
        <a v-else :href="paginationPage(n)" @click.prevent="paginateTo(n)">{{ n }}</a>
      </div>
    </div>
  </div>
</template>

<script>
/*
  Events:
    @paginate-relative
    @paginate-to
*/
export default {
  props: ['page', 'pageCount'],
  methods: {
    paginateRelative (offset) {
      if (this.$parent.paginateRelative)
        this.$parent.paginateRelative(offset)

      this.$emit('paginate-relative', offset)
    },
    paginateTo (offset) {
      if (this.$parent.paginateTo)
        this.$parent.paginateTo(offset)

      this.$emit('paginate-to', offset)
    },
    paginationPage(index) {
      const fullPath = this.$route.fullPath
      let page = fullPath.match(/page=([0-9]+)/)
      
      if (!page) {
        return fullPath + `?page=${index}`
      }

      return fullPath.replace(`page=${page[1]}`, `page=${index}`)
    }
  },
  computed: {
    canPaginateBack () {
      return this.page > 1
    },
    canPaginateForward () {
      return this.page < this.pageCount
    },
    paginationPages () {
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
