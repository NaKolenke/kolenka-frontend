<template>
  <div class="columns">
    <div class="col-2 col-sm-12">
      <span style="vertical-align: middle; height: 24px">{{
        criteria.title
      }}</span>
    </div>
    <div class="col-10 col-sm-12">
      <feather
        style="vertical-align: middle"
        type="star"
        v-for="i in 5"
        :key="i"
        :fill="getFillColor(i)"
        @click.prevent="rate(i)"
        @mouseover="onHover(i)"
        @mouseout="onHover(-1)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Object,
    criteria: Object
  },
  data: function () {
    return {
      hovered: 0
    }
  },
  methods: {
    getFillColor: function (i) {
      // rating = 3
      // hovered = 2
      // 3rd star should be gray
      if (i <= this.value[this.criteria.id]) {
        if (this.hovered > 0 && i > this.hovered) {
          return 'gray'
        }
        return 'black'
      } else {
        // rating = 3
        // hovered = 4
        // 4rd star should be gray, 1-3 should be black
        if (this.hovered > 0 && i <= this.hovered) {
          return 'gray'
        }
        return 'white'
      }
    },
    rate: function (i) {
      var votes = {}
      Object.assign(votes, this.value)
      votes[this.criteria.id] = i
      this.$emit('input', votes)
    },
    onHover: function (i) {
      this.hovered = i
    }
  },
}
</script>

