<template>
  <div class="column col-12 p-2">
    <div class="columns">
      <div class="column col-1">
        <avatar :user="feedback.user" :size="'lg'" :card="true" />
      </div>
      <div class="column col-9">{{feedback.text}}</div>
      <div class="column col-2">
        <span v-if="feedback.is_resolved">Разрешено</span>
        <input
          v-else
          class="btn btn-primary float-left"
          type="submit"
          value="Разрешить"
          @click="send"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '@/components/elements/Avatar.vue'

export default {
  props: ['feedback'],
  methods: {
    send () {
      this.$parent.resolved(this.feedback.id)
    }
  },
  components: {
    Avatar
  }
}
</script>
