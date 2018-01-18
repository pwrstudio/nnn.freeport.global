<template>
  <div class='work'
       :class='{"work--open": payload.open, "work--closed": !payload.open}'>

    <div class='work__image' :style='"background-image: url(" + firstImage + ")"'/>
    <!-- OPEN-->
    <div v-if='payload.open'
         @click='goToWork({name: "singleWork", params: {hash: hash}})'
         class='work__timer'>
      <section>
        <div v-html='"«" + payload.title + "»"' />
        <div v-html='artistList' />
      </section>
    </div>

    <!--CLOSED -->
    <div v-if='!payload.open'
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
import {mapActions} from 'vuex'
import {isPast, parse} from 'date-fns'
import ImgixClient from 'imgix-core-js'

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
        id: '',
        open: false,
        hash: ''
      },
      firstImage: '',
      content: [],
      timeToPublish: '',
      timerId: {},
      open: false
    }
  },
  mounted() {
    var client = new ImgixClient({
      host: 'nnnfreeport.imgix.net',
      secureURLToken: 'A8qQj2zw8eqcXqEW'
    })
    var url = client.buildURL(
      'https://ipfs.io/ipfs/QmNsgAUTpiFhqpvebe6Sd2j3A6k6hU4b88V3wVswcYsafz',
      {w: 400, h: 300}
    )
    console.log(url)

    const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.hash)
    httpPromise.then(response => {
      this.payload = response.body
      this.payload.open = isPast(parse(this.payload.date))
      this.payload.hash = this.hash
      // this.UPDATE_WORK(this.payload)
    })
    httpPromise.catch(err => {
      console.log(err)
    })
  },
  computed: {
    artistList() {
      return this.payload.artists.reduce(
        (accumulator, currentValue) => accumulator + ', ' + currentValue
      )
    }
  },
  methods: {
    ...mapActions(['UPDATE_WORK']),
    goToWork(target) {
      this.$router.push(target)
    },
    setFirstImage() {
      const img = this.content.find(c => c.media === 'Image')
      if (img) {
        let options = {}
        if (this.payload.open) {
          options = {w: 800, auto: 'compress,enhance,format'}
        } else {
          options = {w: 800, auto: 'compress,enhance,format', blur: 100, mono: 808080}
        }
        const client = new ImgixClient({
          host: 'nnnfreeport.imgix.net',
          secureURLToken: 'A8qQj2zw8eqcXqEW'
        })
        let url = client.buildURL('https://ipfs.io/ipfs/' + img.hash, options)
        this.firstImage = url
      }
    }
  },
  components: {
    // VueTyper
  },
  watch: {
    'payload.date'() {
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
        const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + c.hash)
        httpPromise.then(response => {
          this.content.push(response.body)
          this.setFirstImage()
        })
        httpPromise.catch(err => {
          console.log(err)
        })
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
  user-select: none;

  &__image {
    height: 100%;
    width: 100%;
    will-change: opacity;
    transition: opacity 0.4s ease-out;
    opacity: 0.4;
    background-position: center center;
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
