<template>
  <router-link
    :to="'/&/' + exhibition.hash"
    class="status__users__table__body__row"
  >
    <td class="status__users__table__body__row__cell">
      <i
        class="material-icons status__users__table__body__row__cell__icon material-icons status__users__table__body__row__cell__icon--open"
        v-if="payload.open"
        >done</i
      >
      <i
        class="material-icons status__users__table__body__row__cell__icon material-icons status__users__table__body__row__cell__icon--closed"
        v-else
        >clear</i
      >
    </td>
    <td
      class="status__users__table__body__row__cell"
      v-html="payload.start_date"
    />
    <td class="status__users__table__body__row__cell" v-html="payload.title" />
    <td
      class="status__users__table__body__row__cell"
      v-html="payload.festival"
    />
  </router-link>
</template>

<script>
import { isPast, parse } from "date-fns";

export default {
  name: "statusExhibitionsRow",
  props: {
    exhibition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      payload: {
        title: "",
        festival: "",
        open: false,
        location: {
          city: "",
          country: ""
        }
      }
    };
  },
  mounted() {
    const httpPromise = this.$http.get(
      "https://cloudflare-ipfs.com/ipfs/" + this.exhibition.hash
    );
    httpPromise.then(response => {
      this.payload = response.body;
      this.payload.open = isPast(parse(this.payload.start_date));
    });
    httpPromise.catch(console.log);
  }
};
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";

.status__users__table {
  &__body {
    &__row {
      border-bottom: 2px solid $white;
      font-size: $font-size-small;
      cursor: pointer;
      display: table-row;

      &__cell {
        margin: 0;
        border-bottom: 2px solid $black;
        padding: 10px;
        user-select: none;

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
          @include screen-size("small") {
            display: none;
          }
        }
      }
    }
  }
}
</style>
