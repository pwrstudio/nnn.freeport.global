<template>
  <div @click='goToWork({name: "singleWork", params: {hash: hash}})'
       class='work active'
       :class='[sizeClass]'>
    <div v-if='!active'
         class='mesh' />
    <!-- <loader v-if='active' /> -->

    <div class='work__counter'
         v-html='payload.content.length' />

    <div class='work__stats'>

      <div class='work__stats__title'
           v-html='payload.title' />
      <div class='work__stats__artists'
           v-html='payload.artists[0]' />
    </div>
    <!-- <img :src='image'
         class='work__image'> -->
    <div v-text='hash'
         class='work__hash' />
    <vue-countdown-2 v-if='payload.date'
                     :deadline="payload.date"
                     format="%Dd %hh %mm %ss"
                     class='work__timer' />

  </div>
</template>

<script>
import VueCountdown2 from 'vue-countdown-2'
import request from 'browser-request'
import {VueTyper} from 'vue-typer'
import loader from '@/components/loader'

export default {
  name: 'work',
  props: {
    hash: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      payload: {
        artists: [],
        content: [],
        data: '',
        title: '',
        id: ''
      },
      active: true
    }
  },
  mounted() {
    request(
      {
        method: 'GET',
        url: 'https://ipfs.io/ipfs/' + this.hash,
        body: '{"relaxed":true}',
        json: true
      },
      (error, response, body) => {
        if (error) {
          throw error
        }
        this.payload = body
      }
    )
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'large':
          return 'work--large'
        case 'medium':
          return 'work--medium'
        default:
          return 'work--small'
      }
    }
  },
  methods: {
    goToWork(target) {
      if (this.active) {
        this.$router.push(target)
      } else {
        this.$notify({
          group: 'global',
          type: 'warning',
          title: 'Access denied',
          text: 'Unlocked on ' + this.date
        })
      }
    }
  },
  components: {
    VueCountdown2,
    VueTyper,
    loader
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.work {
  height: 40vh;
  position: relative;
  padding: 40px;
  margin: 40px;
  color: white;
  cursor: url('../assets/img/cross-small.png') 26 30;
  border: 1px solid transparent;

  .mesh {
    background-image: url('../assets/img/grid.png');
    opacity: 1;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    // z-index: 10;
  }

  &__image {
    mix-blend-mode: lighten;
    max-height: 80%;
    max-width: 70%;
    object-fit: cover;
    will-change: opacity;
    transition: opacity 0.4s ease-out;
    @include center;
  }

  &.active &__image {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
  }

  // &.active &__title {
  //   bottom: 0;
  //   @include center;
  // }

  &.active {
    cursor: pointer;

    &:hover {
      border: 1px solid white;
      // border: 2px solid orangered;
    }

    &:active {
      background: black;
    }
  }

  &.active:active &__image {
    opacity: 0;
  }

  &--small {
    flex: 1 1 400px;
  }

  &--medium {
    flex: 1 1 500px;
  }

  &--large {
    flex: 1 1 700px;
  }

  // &:hover &__title {
  //   border: 2px solid black !important;
  // }

  // &:hover &__counter {
  //   border: 2px solid black !important;
  // }

  &__timer {
    // background: white;
    // color: white;
    padding: 20px;
    word-break: break-all;
    font-size: 48px;
    opacity: 0.7;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    left: 20px;
    border: 2px solid white;
    white-space: nowrap;
    overflow: hidden;
    @include center;
  }

  &__hash {
    padding: 20px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 1000;
    top: 30px;
    right: 30px;
    // top: 20px;
    // right: 20px;
    // transform-origin: top right;
    // transform: rotateZ(90deg) translateX(100%);
    background: rgba(0, 0, 0, 0.8);
    width: 400px;
    // width: 100%;
    white-space: nowrap;
    overflow: hidden;

    .caret {
      opacity: 0 !important;
      visibility: hidden !important;

      &.typing {
        opacity: 0 !important;
      }
    }

    .char {
      color: white !important;
      .typed {
        color: white !important;
      }
    }
  }

  // &:hover &__hash {
  //   border: 2px solid black !important;

  //   .char {
  //     color: black !important;
  //     .typed {
  //       color: black !important;
  //     }
  //   }
  // }

  &__counter {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: inline-block;
    padding: 20px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    z-index: 10;
    background: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    overflow: hidden;
  }

  &__stats {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 100000000;

    &__title {
      display: inline-block;
      padding: 20px;
      word-break: break-all;
      font-size: 18px;
      line-height: 20px;
      text-align: center;
      z-index: 10;
      background: rgba(0, 0, 0, 0.8);
      white-space: nowrap;
      overflow: hidden;
    }

    &__artists {
      display: inline-block;
      padding: 20px;
      word-break: break-all;
      font-size: 18px;
      line-height: 20px;
      text-align: center;
      z-index: 10;
      background: rgba(0, 0, 0, 0.8);
      white-space: nowrap;
      overflow: hidden;
    }
  }
}

.caret {
  opacity: 0 !important;
  visibility: hidden !important;

  &.typing {
    opacity: 0 !important;
  }
}

.char {
  color: white !important;
  .typed {
    color: white !important;
  }
}
</style>
