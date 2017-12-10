<template>
  <div class='work'>
    <contentAtom v-for='work in main.container.exhibitions[0].works[0].content'
                 :key='work.title'
                 size='medium'
                 :text='"ksksksksk"'
                 :type='work.media'
                 :title='work.title' />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import contentAtom from '@/components/content-atom'
export default {
  name: 'singleWork',
  props: [],
  components: {
    contentAtom
  },
  computed: {
    ...mapState(['main'])
  },
  updated: function() {
    this.$nextTick(function() {
      // Code that will run only after the
      // entire view has been re-rendered
    })
  },
  methods: {}
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.work {
  display: flex;
  flex-wrap: wrap;
}
</style>
