<template>
  <div v-if="jam" class="container">
    <comments-section :jam-url="jam.url" :show-header="false" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CommentsSection from '@/components/comments/CommentsSection'

export default {
  metaInfo () {
    return {
      title: 'Обсуждение'
    }
  },
  data: function () {
    return {
    }
  },
  created () {
  },
  methods: {

  },
  computed: {
    ...mapState({
      jam: state => state.jams.current,
    })
  },
  components: {
    CommentsSection,
  }
}
</script>
