<template>
  <div class='stack'>
    <!-- <div class='headr'>NNN.FREEPORT.GLOBAL</div> -->
    <work v-for='(work, index) in main.container.works'
          :key='work.title'
          :size='sizes[index % 3]'
          :hash='main.rootHash'
          :slug='work.slug'
          :title='work.title'
          :artists='work.artists'
          :date='work.date'
          :image='mockImages[index % 4]'
          :active='mockActive[index % 4]'
          :counter='work.content.length'
          :content='work.content' />
  </div>
</template>

<script>
import {mapState} from 'vuex'
import work from '@/components/work'
export default {
  name: 'stackView',
  props: [],
  components: {
    work
  },
  data() {
    return {
      sizes: ['large', 'small', 'medium'],
      mockImages: ['static/sprawl.jpg', 'static/44.jpg', 'static/clipse.jpg', 'static/salaya1.jpg'],
      mockActive: [true, false, false, true]
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    console.dir(this.main.container.exhibitions[0])
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

.stack {
  display: flex;
  flex-wrap: wrap;
}

.headr {
  width: 100%;
  height: 30vh;
  background: #333333;
  // background: orangered;
  text-align: center;
  font-family: 'helvetica', 'arial', 'roboto', sans-serif;
  font-size: 7vw;
  line-height: 30vh;
  font-weight: 900;
}
</style>
