<template>
  <div class='sidebar'>
    <sidebarBlock v-for='item in main.container.works' :key='item.hash' :hash='item.hash'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import sidebarBlock from '@/components/sidebar-block.vue'

export default {
  name: 'sidebar',
  data() {
    return {}
  },
  computed: {
    ...mapState(['main'])
  },
  components: {
    sidebarBlock
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
}
</style>
