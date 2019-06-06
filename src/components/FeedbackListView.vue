<template>
  <div class="column col-12 py-2">
    <feedback-list-item v-for="feedback in list" :key="feedback.id" :feedback="feedback"></feedback-list-item>
  </div>
</template>

<script>
import FeedbackListItem from '@/components/FeedbackListItem.vue'

export default {
  props: [
    "list"
  ],
  methods: {
    resolved (id) {
      this.$parent.resolved(id)
    }
  },
  components: {
    FeedbackListItem
  }
}
</script>
