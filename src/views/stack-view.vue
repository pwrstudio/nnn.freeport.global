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
      <i class="material-icons material-icons--on">keyboard_arrow_up</i>
      <i class="material-icons material-icons--off">close</i>
    </div>
    <div class="swiper-button-next">
      <i class="material-icons material-icons--on">keyboard_arrow_down</i>
      <i class="material-icons material-icons--off">close</i>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
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
        spaceBetween: 200,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd: this.test,
          init: this.setSlide
        }
      })
    },
    test() {
      let id = document.getElementsByClassName('swiper-slide-active')[0].id
      this.$router.push({name: 'stack', params: {unit: id}})
    },
    setSlide() {
      if (this.$route.params.unit) {
        // TODO
        // this.stackSwiper.slideTo(
        //   console.log(this.main.container.works.map(e => e.hash).indexOf(this.$route.params.unit))
        // )
      } else {
        // this.$router.push({name: 'stack', params: {unit: this.main.container.works[0].hash}})
      }
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
  // height: 100px;
  // line-height: 100px;
  top: auto;
  bottom: 0;
  left: 0;
}

.swiper-button-next {
  @include nav;
  // height: 100px;
  // line-height: 100px;
  top: auto;
  bottom: 0;
  left: 50vw;
}

.swiper-container {
  top: 0;
  height: 100vh;
  // height: calc(100vh - #{$bar-height * 2});
  width: 100vw;
  margin: auto;
  background-image: url(/static/grid-bw.png);
}

.material-icons--off {
  display: none;
}

.swiper-button-disabled {
  pointer-events: all !important;
  &:hover {
    color: darkgrey;
  }
  .material-icons--off {
    display: block;
  }
  .material-icons--on {
    display: none;
  }
}

.swiper-slide {
  overflow: hidden;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
