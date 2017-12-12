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
  data() {
    return {
      data: {}
    }
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
  mounted() {
    this.$notify({
      group: 'global',
      type: 'content',
      title: 'title – artist'
    })
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.work {
  display: flex;
  flex-wrap: wrap;

  header {
    width: 100%;
    justify-content: center;
    align-items: center;
    div {
      margin-top: 40px;
      text-align: center;
      // background: red;
      // font-size: 64px;
      // line-height: 64px;
      color: white;
    }
  }
}
</style>
