<template>
  <tr class='status__users__table__body__row'
      :class='{"status__users__table__body__row--positive": payload.open, "status__users__table__body__row--negative": !payload.open, }'
      @click='goToWork'>
    <td class='status__users__table__body__row__cell'>
      <i class='material-icons status__users__table__body__row__cell__icon material-icons status__users__table__body__row__cell__icon--open' v-if='payload.open'>done</i>
      <i class='material-icons status__users__table__body__row__cell__icon material-icons status__users__table__body__row__cell__icon--closed' v-else>clear</i>
    </div>
    <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide' v-html=''/>
    <td class='status__users__table__body__row__cell' v-html='payload.title'/>
    <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide' v-html='artistList()'/>
  </tr>
</template>

<script>
import {isPast, parse} from 'date-fns'

export default {
  name: 'statusWorksRow',
  props: {
    work: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      payload: {
        artists: [],
        content: [],
        data: '',
        open: false,
        id: '',
        title: ''
      }
    }
  },
  mounted() {
    const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.work.hash)
    httpPromise.then(response => {
      this.payload = response.body
      this.payload.open = isPast(parse(this.payload.date))
    })
    httpPromise.catch(console.log)
  },
  methods: {
    artistList() {
      return this.payload.artists.reduce(
        (accumulator, currentValue) => accumulator + ', ' + currentValue
      )
    },
    goToWork() {
      if (this.payload.open) {
        this.$router.push({name: 'singleWork', params: {hash: this.work.hash}})
      }
    }
  },
  computed: {}
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

.status__users__table {
  &__body {
    &__row {
      cursor: pointer;
      border-bottom: 2px solid $white !important;

      &--positive {
        &:active {
          background: $green;
          color: $black;
        }
      }
      &--negative {
        &:active {
          background: $red;
          color: $black;
        }
      }

      &__cell {
        cursor: pointer;
        margin: 0;
        border-bottom: 2px solid $black;
        padding: 10px;
        user-select: none;
        // white-space: nowrap;
        overflow: hidden;

        &__icon {
          font-size: 24px;
          line-height: 20px;
          position: relative;
          top: 5px;

          &--open {
            color: $green;
          }

          &--closed {
            color: $red;
          }
        }

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