<template>
  <tr class='status__user__stable__body__row' :class='"status__users__table__body__row--" + msg.type'>
    <!-- <td class='status__users__table__body__row__cell'>
      <i v-if='msg.type === "positive"' class="material-icons">add_circle_outline</i>
      <i v-if='msg.type === "negative"' class="material-icons">remove_circle_outline</i>
      <i v-if='msg.type === "network"' class="material-icons">import_export</i>
    </td> -->
    <td class='status__users__table__body__row__cell'>
      {{msg.time}}
    </td>
    <td class='status__users__table__body__row__cell'>
      {{msg.text}}
    </td>
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
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

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
      }

      &--activity {
        background: $yellow;
        color: $black;
      }
      &__cell {
        margin: 0;
        border-bottom: 2px solid $black;
        padding: 10px;
      }
    }
  }
}
</style>
