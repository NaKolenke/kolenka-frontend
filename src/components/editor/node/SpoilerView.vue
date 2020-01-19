<template>
  <div class="card">
    <div class="accordion">
      <input type="checkbox" id="accordion-1" name="accordion-radio" hidden>
      <label class="accordion-header" for="accordion-1">
        <div class="columns">
          <div class="column col-lg-auto">
            <input class="inline-input full" type="text" v-model="title">
          </div>
          <div class="column col-1 text-right">
            <i class="icon icon-arrow-right mr-1"></i>
          </div>
        </div>
      </label>
      <div class="accordion-body">
        {{ node.content }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['node', 'updateAttrs', 'editable'],
  mounted() {
    console.log(this.node)
  },
  computed: {
    title: {
      get() {
        return this.node.attrs.title
      },
      set(title) {
        this.updateAttrs({ title })
      }
    }
  }
}
</script>