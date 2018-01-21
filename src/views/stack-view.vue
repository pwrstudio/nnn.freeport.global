<template>
  <div class='stack'>
    <sidebar/>
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
    <div class="swiper-button-prev slideshow-button-prev">
      <i class="material-icons material-icons--on">keyboard_arrow_up</i>
      <i class="material-icons material-icons--off">close</i>
    </div>
    <div class="swiper-button-next slideshow-button-next">
      <i class="material-icons material-icons--on">keyboard_arrow_down</i>
      <i class="material-icons material-icons--off">close</i>
    </div>

    <!-- Scanner nav button on mobile -->
    <router-link :to='{name: "scan"}' class="scanner-nav">
      <i class="material-icons material-icons--on">center_focus_weak</i>
    </router-link>
  </div>
</template>

<script>
import sidebar from '@/components/sidebar'
import {mapState, mapActions} from 'vuex'
import work from '@/components/work'
import Swiper from 'swiper'

export default {
  name: 'stackView',
  components: {
    work,
    sidebar
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
    ...mapActions(['SET_CURRENT_SLIDE']),
    initSwiper() {
      this.stackSwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: false,
        speed: 400,
        direction: 'vertical',
        keyboard: true,
        simulateTouch: false,
        spaceBetween: 100,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChangeTransitionEnd: this.changeSlide,
          init: this.setSlide(1)
        }
      })
    },
    changeSlide() {
      let id = document.getElementsByClassName('swiper-slide-active')[0].id
      this.$router.push({name: 'stack', params: {unit: id}})
      this.SET_CURRENT_SLIDE(this.$route.params.unit)
    },
    setSlide(duration = 400) {
      this.$nextTick(() => {
        if (this.$route.params.unit) {
          const index = this.main.container.works.map(e => e.hash).indexOf(this.$route.params.unit)
          this.stackSwiper.slideTo(index, duration)
          this.SET_CURRENT_SLIDE(this.$route.params.unit)
        } else {
          this.$router.push({name: 'stack', params: {unit: this.main.container.works[0].hash}})
        }
      })
    }
  },
  watch: {
    $route(to, from) {
      this.setSlide()
    },
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

.slideshow-button-prev {
  @include nav;

  top: auto;
  bottom: 0;
  left: 0;
  z-index: 1000;

  @include screen-size('small') {
    display: none;
  }
}

.slideshow-button-next {
  @include nav;

  top: auto;
  bottom: 0;
  left: 50vw;
  z-index: 1000;

  @include screen-size('small') {
    display: none;
  }
}

.swiper-container {
  top: 0;
  height: 100vh;
  width: calc(100vw - 30px);
  margin-right: 0;
  background-image: url(/static/grid-bw.png);

  @include screen-size('small') {
    background-size: 300px;
  }
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

.scanner-nav {
  display: none;

  @include screen-size('small') {
    align-items: center;
    background: $black;
    border-radius: 80px;
    bottom: 20px;
    display: flex;
    height: 80px;
    justify-content: center;
    position: fixed;
    right: 20px;
    text-decoration: none;
    width: 80px;
    z-index: 1000;

    i {
      color: $white;
      font-size: 50px;
    }

    &:active {
      background: $white;

      i {
        color: $black;
      }
    }
  }
}
</style>
