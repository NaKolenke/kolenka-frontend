<template>
  <div class="accordion">
    <input type="checkbox" :id="accordionId" name="accordion-checkbox" hidden />
    <label class="accordion-header" :for="accordionId">
      <i class="icon icon-arrow-right mr-1"></i>
      {{title}}
    </label>
    <div class="accordion-body bg-gray">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  computed: {
    accordionId: function () {
      return Math.round(Math.random() * 100000)
    },
    spoilerTitle: function () {
      if (this.title) {
        return this.title
      } else {
        return "Спойлер"
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-body {
  padding-left: 8px;
}
</style>

