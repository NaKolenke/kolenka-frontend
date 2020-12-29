<template>
  <div>
    <template v-if="isLoading">
      <blog-skeleton v-for="i in 10" :key="i" />
    </template>

    <div v-else id="content">
      <div v-if="jams.current.length > 0">
        <h4>Текущие джемы</h4>
        <jam-card v-for="jam in jams.current" :key="jam.id" :jam="jam" />
      </div>

      <div class="clearfix"></div>

      <div v-if="jams.closest.length > 0" class="mt-2">
        <h4>Предстоящие джемы</h4>
        <jam-card v-for="jam in jams.closest" :key="jam.id" :jam="jam" />
      </div>

      <div class="clearfix"></div>

      <div v-if="jams.closed.length > 0" class="mt-2">
        <h4>Старые джемы</h4>
        <jam-card v-for="jam in jams.closed" :key="jam.id" :jam="jam" />

        <pagination-view :page="page" :page-count="pageCount"></pagination-view>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationView from '@/components/PaginationView.vue'
import JamCard from '@/components/cards/JamCard.vue'
import BlogSkeleton from '@/components/skeletons/BlogCard.vue'
import Pagination from '@/models/pagination'
import errors from '@/utils/errors'

export default {
  metaInfo () {
    return {
      title: 'Джемы'
    }
  },
  data () {
    return {
      jams: [],
      page: 1,
      pageCount: 0,
      isLoading: true
    }
  },
  created () {
    this.refreshPage(this.$route)
  },
  beforeRouteUpdate (to, from, next) {
    this.refreshPage(to)
    next()
  },
  methods: {
    refreshPage (route) {
      this.jams = []
      this.isLoading = true
      this.page = parseInt(route.query.page) || this.page

      this.$store.dispatch('jams/getAllJams', { pagination: new Pagination(this.page) })
        .then(res => {
          this.jams = res.jams
          this.pageCount = res.meta.page_count
          this.isLoading = false
        }).catch(error => {
          this.isLoading = false
          errors.handle(error)
          this.$toast.error(errors.getText(error))
        })
    },
    paginateRelative (offset) {
      this.$router.push({ name: 'jams', query: { page: this.page + offset } })
    },
    paginateTo (page) {
      this.$router.push({ name: 'jams', query: { page: page } })
    }
  },
  components: {
    PaginationView,
    JamCard,
    BlogSkeleton
  }
}
</script>
