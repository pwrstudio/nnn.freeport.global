<template>
  <tr class='status__users__row'>
    <td class='status__users__table__body__row__cell'>
      {{user.id}}
    </td>
    <td class='status__users__table__body__row__cell'>
      {{user.ip}}
    </td>
    <td class='status__users__table__body__row__cell'>
      <span v-if='user.geo.city'>{{user.geo.city}}, </span>
      <span v-if='user.geo.country'>{{user.geo.country}}</span>
    </td>
    <td class='status__users__table__body__row__cell'>
      {{timeOnSite}}
    </td>
  </tr>
</template>

<script>
import countdown from 'countdown'

export default {
  name: 'statusUserRow',
  data() {
    return {
      timeOnSite: ''
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  mounted() {
    countdown.setLabels('ms| |:|h|d|w|m|y|d|s|m', 'ms| |:|h|d|w|m|y|d|s|m', '', ':', '0', n => {
      if (n < 10) {
        return '0' + n.toString()
      } else {
        return n.toString()
      }
    })
    countdown(
      new Date(this.user.time),
      ts => {
        this.timeOnSite = ts.toString()
        // this.timeOnSite = this.user.date
      },
      [countdown.HOURS, countdown.MINUTES, countdown.SECONDS]
    )
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.status__users__table {
  &__body {
    &__row {
      &__cell {
        border-bottom: 1px solid $white;
        padding: 10px;
      }
    }
  }
}
</style>
