<template>
  <div @click='goToWork({name: "singleWork", params: {hash: hash}})'
       class='work active'>

    <div class='work__counter'
         v-html='payload.content.length' />

    <div class='work__qr'>
      <qrcode :value="hash"
              :options="{ size: 600, foreground: '#ffffff', background: '#000000'  }" />
    </div>

    <img v-if='firstImage'
         :src='firstImage'
         class='work__image'>

    <div class='work__title'>{{payload.title}} - {{payload.artists[0]}}</div>

    <!-- <div class='work__stats'>
    </div> -->

    <div class='work__exhibition'>Territories of Complicity</div>

    <!-- <div v-text='hash'
         class='work__hash' /> -->
    <!-- <vue-countdown-2 v-if='payload.date'
                     :deadline="payload.date"
                     format="%Dd %hh %mm %ss"
                     class='work__timer' /> -->
  </div>
</template>

<script>
import VueCountdown2 from 'vue-countdown-2'
import request from 'browser-request'
import {VueTyper} from 'vue-typer'

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
      content: [],
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
        this.payload.content.map(c => {
          request(
            {
              method: 'GET',
              url: 'https://ipfs.io/ipfs/' + c.hash,
              body: '{"relaxed":true}',
              json: true
            },
            (error, response, body) => {
              if (error) {
                throw error
              }
              this.content.push(body)
            }
          )
        })
      }
    )
  },
  computed: {
    firstImage() {
      const img = this.content.find(c => c.media === 'Image')
      if (img) {
        return 'https://ipfs.io/ipfs/' + img.hash
      } else {
        return false
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
    VueTyper
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.work {
  height: 100%;
  width: 100vw;
  position: relative;
  color: white;
  background: $black;

  &__qr {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 100px;
    canvas {
      max-width: 100%;
    }
  }

  &__image {
    // mix-blend-mode: lighten;
    max-height: 80%;
    max-width: 70%;
    object-fit: cover;
    will-change: opacity;
    transition: opacity 0.4s ease-out;
    @include center;
  }

  // &.active &__image {
  //   width: 100%;
  //   height: 100%;
  //   max-height: 100%;
  //   max-width: 100%;
  // }

  // &.active {
  //   cursor: pointer;

  //   &:hover {
  //   }

  //   &:active {
  //     background: black;
  //   }
  // }

  // &.active:active &__image {
  //   opacity: 0;
  // }

  &__timer {
    padding: 20px;
    word-break: break-all;
    font-size: 48px;
    opacity: 0.7;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    left: 20px;
    // border: 2px solid white;
    white-space: nowrap;
    overflow: hidden;
    @include center;
  }

  &__hash {
    padding: 20px;
    word-break: break-all;
    font-size: 24px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 1000;
    top: 20px;
    left: 20px;
    // transform-origin: top right;
    // transform: rotateZ(90deg) translateX(100%);
    // background: rgba(0, 0, 0, 0.8);
    width: 70vh;
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
      color: $white !important;
      .typed {
        color: $white !important;
      }
    }
  }

  &__counter {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: inline-block;
    padding: 40px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    z-index: 10;
    white-space: nowrap;
    overflow: hidden;
    color: white;
    font-size: 48px;
    border: 1px solid white;
  }

  &__exhibition {
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 20px;
    border: 1px solid white;
  }

  &__title {
    // display: inline-block;
    padding: 20px;
    // word-break: break-all;

    text-align: center;
    z-index: 10;
    // white-space: nowrap;
    overflow: hidden;
    position: absolute;
    bottom: 20px;
    left: 20px;
    padding: 20px;
    border: 1px solid white;
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
