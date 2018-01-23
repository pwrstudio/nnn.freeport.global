<template>
  <tr class='status__users__table__body__row' 
      :class='"status__users__table__body__row--" + msg.type'
      @click='goToWork'>
    <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide' v-html='msg.time'/>
    <td class='status__users__table__body__row__cell' v-html='msg.text'/>
  </tr>
</template>

<script>
export default {
  name: 'statusLogRow',
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToWork() {
      if (this.msg.type === 'activity') {
        this.$router.push({name: 'singleWork', params: {hash: this.msg.hash}})
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

.status__users__table {
  &__body {
    &__row {
      &--positive {
        background: $green;
        color: $black;
      }
      &--negative {
        background: $red;
        color: $black;
      }
      &--network {
        background: #bababa;
        color: $black;

        @include screen-size('small') {
          word-break: break-all;
        }
      }

      &--activity {
        background: $yellow;
        color: $black !important;
        cursor: pointer;
        text-decoration: none;

        a {
          color: $black !important;
          text-decoration: none;
        }

        &:active {
          background: $white;
        }
      }
      &__cell {
        margin: 0;
        border-bottom: 2px solid $black;
        padding: 10px;
        user-select: none;

        &--mobile-hide {
          @include screen-size('small') {
            display: none;
          }
        }
      }
    }
  }
}
</style>
