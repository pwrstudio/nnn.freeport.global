<template>
  <div class='stack'>
    <work v-for='(work, index) in main.container.works'
          :key='work.title'
          :size='sizes[index % 3]'
          :hash='main.rootHash'
          :slug='work.slug'
          :title='work.title'
          :date='work.date'
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
      sizes: ['large', 'small', 'medium']
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
</style>
