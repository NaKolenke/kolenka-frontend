<template>
  <div class="form-group float-right">
    <div class="btn-group btn-group-block" style="width:350px">
      <div v-if="isLoading" class="loading mr-32"></div>
      <input
        type="submit"
        class="btn btn-primary"
        :value="title"
        @click="$emit('click')"
        :disabled="isLoading || !isValid"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    isLoading: Boolean,
    isValid: Boolean
  }
}
</script>
