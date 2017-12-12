<template>
  <div class='work'>
    <contentAtom v-for='content in matchedWork.content'
                 :key='content.title'
                 :size='"medium"'
                 :type='content.media'
                 :hash='content.ipfs[0].hash'
                 :title='content.title'
                 :slug='content.slug' />
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
    ...mapState(['main']),
    matchedWork() {
      let exhibition = this.main.container.exhibitions.find(
        e => e.slug === this.$route.params.exhibition
      )
      if (exhibition) {
        let work = exhibition.works.find(w => w.slug === this.$route.params.work)
        if (work) {
          return work
        } else {
          return []
        }
      } else {
        return []
      }
    }
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
