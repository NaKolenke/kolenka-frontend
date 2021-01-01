<template>
  <div class="form-group">
    <div class="col-3 col-sm-12">
      <label class="form-label">Ссылки</label>
    </div>

    <div class="col-9 col-sm-12">
      <div v-for="(link, index) in value" :key="link.id" class="my-2">
        <div class="input-group">
          <input
            class="form-input"
            type="text"
            placeholder="Название"
            v-bind:value="link.title"
            v-on:input="changeLink(link.id, $event.target.value)"
          />
          <input
            class="form-input"
            type="text"
            placeholder="Ссылка"
            v-bind:value="link.href"
            v-on:input="changeLinkHref(link.id, $event.target.value)"
          />
        </div>

        <button
          v-if="index > 0"
          class="btn btn-link"
          @click="changeOrder(link.id, -1)"
        >
          Вверх
        </button>
        <button
          v-if="index < value.length - 1"
          class="btn btn-link"
          @click="changeOrder(link.id, +1)"
        >
          Вниз
        </button>

        <button class="btn btn-link float-right" @click="removeLink(link.id)">
          Убрать
        </button>
      </div>

      <div class="form-group float-right my-2">
        <div class="btn-group btn-group-block">
          <button class="btn btn-primary" @click="addLink()">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: Array
  },
  methods: {
    addLink: function () {
      var newId = this.value.reduce((min, c) => {
        if (c.id < min) {
          return c.id
        }
        return min
      }, 0)
      newId = newId - 1

      var newOrder = this.value.reduce((max, c) => {
        if (c.order > max) {
          return c.order
        }
        return max
      }, 0)
      newOrder = newOrder + 1

      this.$emit('input', this.value.concat([{ id: newId, title: '', href: '', order: newOrder }]))
    },
    changeLink: function (id, newTitle) {
      this.$emit('input', this.value.map(c => {
        if (c.id === id) {
          c.title = newTitle
        }
        return c
      }))
    },
    changeLinkHref: function (id, newHref) {
      this.$emit('input', this.value.map(c => {
        if (c.id === id) {
          c.href = newHref
        }
        return c
      }))
    },
    changeOrder: function (id, newPlacement) {
      var index = this.value.findIndex(c => c.id === id)
      var currentElement = this.value[index]
      var currentOrder = currentElement.order

      if (newPlacement < 0 && index > 0) {
        var previousElement = this.value[index - 1]
        currentElement.order = previousElement.order
        previousElement.order = currentOrder
      }

      if (newPlacement > 0 && index < this.value.length) {
        var nextElement = this.value[index + 1]
        currentElement.order = nextElement.order
        nextElement.order = currentOrder
      }

      var newVal = [...this.value]
      this.$emit('input', newVal.sort((a, b) => a.order - b.order))
    },
    removeLink: function (id) {
      this.$emit('input', this.value.filter(c => c.id !== id))
    }
  }
}
</script>
