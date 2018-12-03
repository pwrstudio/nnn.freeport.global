<template>
  <router-link 
    :to='{name: "stack", params: {unit: hash}}'
    v-tooltip.left-start='payload.title'
    class='sidebar-block'
    :class='{"sidebar-block--active": (hash === $route.params.unit), "sidebar-block--open": payload.open, "sidebar-block--closed": !payload.open}'/>
</template>

<script>
import { isPast, parse } from 'date-fns'

export default {
  name: 'sidebar-block',
  data() {
    return {
      payload: {
        artists: [''],
        content: [],
        date: '',
        title: '',
        id: '',
        open: false,
        hash: '',
      },
    }
  },
  props: {
    hash: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const httpPromise = this.$http.get(
      'https://cloudflare-ipfs.com/ipfs/' + this.hash,
    )
    httpPromise.then(response => {
      this.payload = response.body
      this.payload.open = isPast(parse(this.payload.date))
      this.payload.hash = this.hash
    })
    httpPromise.catch(err => {
      console.log(err)
    })
  },
}
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";

.sidebar-block {
  width: 100%;
  height: 100px;
  flex: 2 2 10%;
  border-bottom: 1px solid $white;
  &:last-child {
    border-bottom: 1px solid transparent;
  }
  &--open {
    background: $green;
  }
  &--closed {
    background: $red;
  }
  &--active {
    background: $white;
  }
}
</style>
