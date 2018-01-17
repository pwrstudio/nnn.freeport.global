<template>
  <div class='work'
       :class='{"work--open": open, "work--closed": !open}'>

    <div class='work__image' :style='"background-image: url(http://ipfs.io/ipfs/" + firstImage + ")"'/>
    <!-- OPEN-->
    <div v-if='open'
         @click='goToWork({name: "singleWork", params: {hash: hash}})'
         class='work__timer'>
      <section>
        <div v-html='"«" + payload.title + "»"' />
        <div v-html='artistList' />
      </section>
    </div>

    <!--CLOSED -->
    <div v-if='!open'
         class='work__timer'>
      <section>
        <div v-html='"«" + payload.title + "»"' />
        <div v-html='artistList' />
        <div v-html='timeToPublish' />
      </section>
      <i class="material-icons material-icons--large">close</i>
    </div>

  </div>
</template>

<script>
import countdown from 'countdown'
import {isPast, parse} from 'date-fns'
import request from 'browser-request'

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
        artists: [''],
        content: [],
        date: '',
        title: '',
        id: ''
      },
      firstImage: '',
      content: [],
      active: true,
      timeToPublish: '',
      timerId: {},
      open: false
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
    artistList() {
      return this.payload.artists.reduce(
        (accumulator, currentValue) => accumulator + ', ' + currentValue
      )
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
    },
    setFirstImage() {
      const img = this.content.find(c => c.media === 'Image')
      if (img) {
        this.firstImage = img.hash
      }
    }
  },
  components: {
    // VueTyper
  },
  watch: {
    'payload.date'() {
      this.open = isPast(parse(this.payload.date))
      countdown.setLabels('ms|s|m|h|d|w|m|y|d|s|m', 'ms|s|m|h|d|w|m|y|d|s|m', ':', ':', 'now')
      this.timerId = countdown(
        new Date(this.payload.date),
        ts => {
          this.timeToPublish = ts.toString()
        },
        [countdown.HOURS, countdown.MINUTES, countdown.SECONDS]
      )
    },
    'payload.content'() {
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
            console.log(body)
            this.content.push(body)
            this.setFirstImage()
          }
        )
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

@mixin box {
  padding: 15px;
  border: 1px solid white;
  margin-bottom: 20px;
  @include screen-size('medium') {
    font-size: 18px;
    line-height: 18px;
    padding: 10px;
  }
  @include screen-size('short') {
    font-size: 18px;
    line-height: 18px;
    padding: 10px;
  }
}

@mixin label {
  font-size: 14px;
  text-transform: uppercase;
  width: 12ch;
  display: inline-block;
  letter-spacing: 1px;
  @include screen-size('medium') {
    font-size: 12px;
  }
}

.work {
  height: 100%;
  width: 100%;
  position: relative;
  color: white;
  mix-blend-mode: multiply;

  &__image {
    height: 100%;
    width: 100%;
    will-change: opacity;
    transition: opacity 0.4s ease-out;
    opacity: 0.4;
  }

  &--open {
    cursor: pointer;
    i {
      color: $green;
    }
    background: $black;
    transition: background 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:active {
      transition: background 0s linear;
      background: $green;
      i {
        color: $black;
      }
    }
  }

  &--closed {
    i {
      color: $red;
      mix-blend-mode: lighten;
    }
    background: $black;
    transition: background 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:active {
      transition: background 0s linear;
      background: $red;
      i {
        color: $black;
      }
    }
  }

  &--closed &__image {
    filter: grayscale(1);
    opacity: 0.4;
  }

  &__sidebar {
    float: right;
    @include screen-size('small') {
      float: left;
      width: 100%;
    }
  }

  &__qr {
    width: 200px;
    margin-bottom: 20px;
    canvas {
      max-width: 100%;
    }
    @include screen-size('medium') {
      top: 160px;
      width: 100px;
      height: 100px;
    }
    @include screen-size('small') {
      display: none;
    }
  }

  &__counter {
    width: 200px;
    height: 200px;
    word-break: break-all;
    line-height: 200px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    color: white;
    font-size: 48px;
    border: 1px solid $white;
    margin-bottom: 20px;
    @include screen-size('medium') {
      font-size: 38px;
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
    @include screen-size('small') {
      float: left;
      width: calc(100% - 4px);
    }
  }

  &__info {
    width: calc(100% - 220px);
    float: left;
    @include screen-size('medium') {
      width: calc(100% - 120px);
    }
    @include screen-size('small') {
      width: 100%;
    }
  }

  &__timer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px !important;
    line-height: 64px !important;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    // text-shadow: -10px 10px 100px $black, 10px -10px 100px $white;
    section {
      @include center;
      z-index: 10;
      width: 80vw;
      z-index: 100;
    }
    @include screen-size('small') {
      font-size: 32px !important;
      line-height: 32px !important;
    }
    @include screen-size('large') {
      font-size: 92px !important;
      line-height: 90px !important;
    }
  }

  &__hash {
    padding: 20px;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    @include box;
    &__label {
      @include label;
    }
  }

  &__exhibition {
    @include box;
    &__label {
      @include label;
    }
  }

  &__location {
    @include box;
    &__label {
      @include label;
    }
  }

  &__artist {
    @include box;
    &__label {
      @include label;
    }
  }

  &__title {
    @include box;
    &__label {
      @include label;
    }
  }

  &__link {
    @include box;
    width: 50%;
    float: right;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 68px;
    // &--open {
    //   &:hover {
    //     background: $green;
    //     border: 1px solid $green;
    //     cursor: pointer;
    //   }
    // }
    // &--closed {
    //   &:hover {
    //     background: $red;
    //     border: 1px solid $red;
    //   }
    // }
    @include screen-size('medium') {
      height: 60px;
    }
    @include screen-size('short') {
      height: 60px;
    }
    @include screen-size('small') {
      width: 100%;
    }
  }
}

.material-icons--large {
  font-size: 100vh;
  @include center;
  z-index: 5000;
}

.material-icons--medium {
  font-size: 70vh;
  @include center;
  z-index: 5000;
}

// .swiper-slide {
//   .work {
//     .work__image {
//       opacity: 0;
//       transition: opacity 20s ease-out;
//     }
//   }
// }

// .swiper-slide-active {
//   .work {
//     .work__image {
//       opacity: 1;
//     }
//   }
// }
</style>
