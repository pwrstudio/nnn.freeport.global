<template>
  <div class='stack'>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"
             v-for='(work, index) in main.container.works'
             :key='work.hash'>
          <work :hash='work.hash' />
        </div>
      </div>
    </div>
    <div class="swiper-button-next">
      next
    </div>
    <div class="swiper-button-prev">
      previous </div>
    <router-link class='nav-button nav-button__left'
                 to='info'>
      <svg id="Layer_1"
           data-name="Layer 1"
           xmlns="http://www.w3.org/2000/svg"
           width="808.5204"
           height="378.3499"
           viewBox="0 0 808.5204 378.3499">
        <polygon class="cls-1"
                 points="755.212 85.751 656.642 296.394 654.888 38.804 571.964 0 433.284 296.394 431.53 38.804 348.606 0 209.926 296.394 208.173 38.804 125.248 0 0 267.653 54.049 292.946 157.989 70.827 157.705 341.451 236.556 378.35 381.347 70.827 381.063 341.451 459.914 378.35 604.705 70.827 604.42 341.451 683.272 378.35 808.52 110.696 755.212 85.751" />
      </svg>
    </router-link>

    <router-link class='nav-button nav-button__right'
                 to='status'>dashboard</router-link>

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
      sizes: ['large', 'small', 'medium']
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    this.$nextTick(() => {
      const mySwiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: false,
        speed: 400,
        keyboard: true,
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
      console.log(mySwiper)
    })
  },
  methods: {}
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
  width: calc(100vw - 80px);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  @include hide-scroll;
}

.swiper-button-prev {
  background: rgba(130, 130, 130, 1);
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  width: 50vw;
  height: $bar-height;
  margin-top: 0;
  font-size: 32px;
  text-align: center;
  line-height: $bar-height;
  color: $white;
  user-select: none;
  &:hover {
    background: $green;
  }
  &:active {
    background: $white;
  }
  svg {
    @include center;
    max-height: 80%;
    // transform: rotate(180deg);
  }
}

.swiper-button-next {
  position: fixed;
  top: auto;
  bottom: 0;
  right: 0;
  width: 50vw;
  height: $bar-height;
  margin-top: 0;
  font-size: 32px;
  text-align: center;
  line-height: $bar-height;
  background: rgba(130, 130, 130, 1);
  color: $white;
  user-select: none;
  &:hover {
    background: $green;
  }
  &:active {
    background: $white;
  }
  svg {
    @include center;
    max-height: 80%;
  }
}

.swiper-container {
  top: $bar-height;
  height: calc(100vh - #{$bar-height * 2});
  width: 100vw;
  margin: 0;
}

.swiper-button-disabled {
  pointer-events: all !important;
  &:hover {
    background: rgb(241, 64, 64);
  }
}

.nav-button {
  position: absolute;
  top: 0;
  width: 50vw;
  height: $bar-height;
  background: $black;
  color: $white;
  font-size: 32px;
  line-height: $bar-height;
  text-align: center;
  z-index: 1000;
  text-decoration: none !important;
  border-bottom: 1px solid $white;
  &:hover {
    background: $green;
  }
  &__left {
    left: 0;
    svg {
      fill: $white;
      max-height: 70%;
      @include center;
    }
  }
  &__right {
    left: 50vw;
  }
}

swiper-slide {
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
