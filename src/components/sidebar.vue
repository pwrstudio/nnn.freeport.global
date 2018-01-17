<template>
  <div class='sidebar'>
    <router-link :to='{name: "stack", params: {unit: item.hash}}' class='sidebar__block' v-for='item in main.container.works' :key='item.hash' :class='{"sidebar__block--active": (item.hash === $route.params.unit), "sidebar__block--open": item.open, "sidebar__block--closed": !item.open}'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'sidebar',
  data() {
    return {}
  },
  props: {
    hash: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapState(['main']),
    blockState(block) {
      console.log(block)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.sidebar {
  position: fixed;
  top: 80px;
  right: 0;
  height: calc(100vh - 160px);
  width: 40px;
  z-index: 10000;
  display: flex;
  flex-direction: column;

  &__block {
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
}
</style>
