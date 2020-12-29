<template>
  <div class="form-group" :class="[{'has-error':!!validation && !validation.success}]">
    <div class="col-3 col-sm-12">
      <label class="form-label" :for="fieldId">{{title}}</label>
    </div>

    <div class="col-9 col-sm-12">
      <input
        v-if="type === 'text'"
        class="form-input"
        type="text"
        :id="fieldId"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        v-validate="validation"
        required
      />
      <input
        v-else-if="type === 'date'"
        class="form-input"
        type="date"
        :id="fieldId"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        v-validate="validation"
        required
      />
      <textarea
        v-else-if="type === 'large-text'"
        class="form-input"
        type="text"
        :id="fieldId"
        maxlength="250"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        v-validate="validation"
      ></textarea>

      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fieldId: String,
    title: String,
    type: {
      validator: function (value) {
        // The value must match one of these strings
        return ['text', 'large-text', 'date'].indexOf(value) !== -1
      }
    },
    validation: {
      type: Object,
      required: false
    },
    value: String
  },
  data: function () {
    return {
    }
  }
}
</script>
