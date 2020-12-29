<template>
  <div>
    <div id="feedback_container">
      <h3>Поставить оценку</h3>
    </div>

    <div class="container" v-if="Object.keys(rating).length > 0">
      <div v-for="criteria in criterias" :key="criteria.id" class="my-2">
        <rating v-model="rating" :criteria="criteria" />
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '@/components/jams/Rating.vue'

export default {
  props: {
    entry: Object,
    criterias: Array,
    value: Object
  },
  data: function () {
    return {
      rating: {}
    }
  },
  mounted: function () {
    this.rating = this.value
  },
  methods: {

  },
  watch: {
    rating: function (newVal, _) {
      this.$emit('input', newVal)
    }
  },
  components: {
    Rating
  }
}
</script>
