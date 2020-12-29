<template>
  <!-- <p class="form-input-hint">
    {{urlBase}}
    <span v-if="!isChangingSlug" @click="changeSlug">{{ slugChanged ? newSlug : slug }}</span>
    <input
      v-else
      type="text"
      :class="['form-input', 'input-sm', { 'is-error': !validation.slug.success }, 'slug-input']"
      v-model="newSlug"
      v-validate="validation.slug"
      @blur="isChangingSlug = false"
      @keyup="if ($event.keyCode === 27) isChangingSlug = false"
      autofocus
    />
  </p>-->
  <p class="form-input-hint">
    {{ urlBase }}
    <span>{{ slug }}</span>
    <!-- <input
      v-if="isChangingSlug"
      type="text"
      :class="[
        'form-input',
        'input-sm',
        { 'is-error': !validation.slug.success },
        'slug-input',
      ]"
      v-model="newSlug"
      v-validate="validation.slug"
      @blur="isChangingSlug = false"
      @keyup="resetSlugCahngeOnEnter"
      autofocus
    />
    <span v-else @click="changeSlug">{{ slug }}</span> -->
  </p>
</template>

<script>
import slugify from 'speakingurl'

export default {
  props: {
    urlBase: String,
    field: String,
    canChange: Boolean,
    value: String
  },
  data: function () {
    return {
      isChangingSlug: false,
      newSlug: ''
    }
  },
  methods: {
    resetSlugChangeOnEnter: function (event) {
      if (event.keyCode === 27) {
        this.isChangingSlug = false
      }
    },
    changeSlug: function () {
      this.isChangingSlug = true
    }
  },
  computed: {
    slug () {
      if (this.canChange) {
        var newValue = slugify(this.field, { lang: 'ru' })
        this.$emit('input', newValue)
        return newValue
      }
      return this.value
    },
  }
}
</script>
