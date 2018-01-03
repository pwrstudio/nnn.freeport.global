<template>
  <div class='stack'>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for='(work, index) in main.container.works'
             :key='work.hash'
             :id='work.hash'>
          <work :hash='work.hash' />
        </div>
      </div>
    </div>
    <div class="swiper-button-prev">
      <i class="material-icons">keyboard_arrow_up</i>
    </div>
    <div class="swiper-button-next">
      <i class="material-icons">keyboard_arrow_down</i>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import work from '@/components/work'
import Swiper from 'swiper'

export default {
  name: 'stackView',
  components: {
    work
  },
  data() {
    return {
      stackSwiper: {}
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    if (this.main.container.works) {
      this.$nextTick(this.initSwiper)
    }
  },
  methods: {
    initSwiper() {
      console.log('init swiper')
      this.stackSwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: false,
        speed: 400,
        direction: 'vertical',
        keyboard: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
    }
  },
  watch: {
    'main.container.works'() {
      this.$nextTick(this.initSwiper)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/vendor/swiper.css';

.stack {
  background: $black;
  position: fixed;
  top: 0px;
  left: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  @include hide-scroll;
}

.swiper-button-prev {
  @include nav;
  top: auto;
  bottom: 0;
  left: 0;
}

.swiper-button-next {
  @include nav;
  top: auto;
  bottom: 0;
  left: 50vw;
}

.swiper-container {
  top: $bar-height;
  height: calc(100vh - #{$bar-height * 2});
  width: calc(100vw - 40px);
  margin: auto;
}

.swiper-button-disabled {
  pointer-events: all !important;
  &:hover {
    background: $red;
  }
}

swiper-slide {
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
