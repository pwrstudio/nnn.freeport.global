<template>
  <tr class='status__users__table__body__row'
      :class='{"status__users__table__body__row--positive": payload.open, "status__users__table__body__row--negative": !payload.open, }'
      @click='goToWork'>
    <td class='status__users__table__body__row__cell'>
      <i class='material-icons status__users__table__body__row__cell__icon material-icons status__users__table__body__row__cell__icon--open'
         v-if='payload.open'>done</i>
      <i class='material-icons status__users__table__body__row__cell__icon material-icons status__users__table__body__row__cell__icon--closed'
         v-else>clear</i>
      </td>
      <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide'/>
      <td class='status__users__table__body__row__cell'
          v-html='payload.title' />
      <td class='status__users__table__body__row__cell status__users__table__body__row__cell--mobile-hide'
          v-html='payload.artistList' />
  </tr>
</template>

<script>
import { isPast, parse } from 'date-fns'

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
        artistList: [],
        content: [],
        data: '',
        open: false,
        id: '',
        title: ''
      }
    }
  },
  mounted() {
    const httpPromise = this.$http.get(
      'https://cloudflare-ipfs.com/ipfs/' + this.work.hash
    )
    httpPromise.then(response => {
      this.payload = response.body
      this.payload.open = isPast(parse(this.payload.date))
    })
    httpPromise.catch(console.log)
  },
  methods: {
    getArtistList() {
      if (this.payload.artists.length > 0) {
        return this.payload.artists.reduce(
          (accumulator, currentValue) => accumulator + ', ' + currentValue
        )
      }
    },
    goToWork() {
      if (this.payload.open) {
        this.$router.push({
          name: 'singleWork',
          params: { hash: this.work.hash }
        })
      }
    }
  },
  watch: {
    payload() {
      this.payload.artistList = this.getArtistList()
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

.status__users__table {
  // padding-bottom: 140px;

  &__body {
    &__row {
      cursor: pointer;
      border-bottom: 2px solid $white !important;
      font-size: $font-size-small;

      // &:last-child {
      //   margin-bottom: 140px;
      // }

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
        overflow: hidden;

        &__icon {
          font-size: $font-size-medium;
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
