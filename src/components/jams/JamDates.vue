<template>
  <div class="jam-dates my-1">
    <span v-if="jam.status===0">
      <strong>Начинается {{jam.start_date | moment_date}} ({{jam | start_in}})</strong>
      - длится {{jam | duration}}
      <!-- <p>Закончится: {{jam.end_date | moment_date}} ({{jam | end_in}})</p> -->
    </span>
    <span v-if="jam.status===1">
      <!-- <p>Начался: {{jam.start_date | moment_date}} ({{jam | start_in}})</p> -->
      <strong>Закончится: {{jam.end_date | moment_date}} ({{jam | end_in}})</strong>
    </span>
    <span v-if="jam.status===2">Закончился: {{jam.end_date | moment_date}}</span>
    <span class="mx-2 tooltip tooltip-bottom" data-tooltip="Участники">
      <i class="icon icon-people"></i>
      {{jam.participators}}
    </span>
  </div>
</template>

<script>
import Moment from 'moment'

export default {
  props: {
    jam: Object,
  },
  filters: {
    start_in: function (jam) {
      return Moment.unix(jam.start_date).fromNow()
    },
    end_in: function (jam) {
      return Moment.unix(jam.end_date).fromNow()
    },
    duration: function (jam) {
      var days = Moment.unix(jam.end_date).diff(Moment.unix(jam.start_date), 'days')
      if (days % 10 === 1) {
        return `${days} день`
      } else if (days % 10 === 2 || days % 10 === 3 || days % 10 === 4) {
        return `${days} дня`
      } else {
        return `${days} дней`
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.jam-dates {
  font-size: 0.7rem;
}
</style>
