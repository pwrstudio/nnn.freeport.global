<template>
  <tr class='status__users__table__body__row'>
    <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide'
        @click='openChat(user.id)'>
      <i class="material-icons">chat_bubble_outline</i>
    </td>
    <td class='status__users__table__body__row__cell status__users__table__body__row__cell--capped'>
      {{user.id}}
    </td>
    <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide'>
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
        if (ts.minutes === 0) {
          this.timeOnSite = '00:' + ts.toString()
        } else {
          if (ts.seconds === 0) {
            this.timeOnSite = '' + ts.toString() + '00'
          } else {
            this.timeOnSite = ts.toString()
          }
        }
      },
      [countdown.HOURS, countdown.MINUTES, countdown.SECONDS]
    )
  },
  methods: {
    openChat(id) {
      this.$socket.emit('chat', {id: id, msg: 'kxkxkxkxk'})
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

.status__users__table {
  user-select: none;

  &__body {
    &__row {
      font-size: $font-size-small;

      @include screen-size('small') {
        font-size: $font-size-xs !important;
      }

      &__cell {
        border-bottom: 1px solid $white;
        padding: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;

        &:first-child {
          &:active {
            background: $yellow;
          }
        }

        i {
          font-size: $font-size-small;
          line-height: 20px;
          text-align: center;
          position: relative;
          top: 5px;
          cursor: pointer;
        }

        &--mobile-hide {
          @include screen-size('small') {
            display: none;
          }
        }
        &--capped {
          @include screen-size('small') {
            max-width: 30vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
