<template>
  <div class='work'
       :class='{"work--open": open, "work--closed": !open}'>

    <!-- OPEN-->
    <div v-if='open'
         @click='goToWork({name: "singleWork", params: {hash: hash}})'
         class='work__timer'>
      <section>
        <div v-html='payload.title' />
        <div v-html='artistList' />
      </section>
      <!-- <i class="material-icons material-icons--large">done</i> -->
      <i class="material-icons material-icons--large">arrow_forward</i>
      <!-- <i class="material-icons material-icons--large">open_with</i> -->
      <!-- <i class="material-icons material-icons--large">launch</i> -->
      <!-- <i class="material-icons material-icons--large">lock_open</i> -->
    </div>

    <!--CLOSED -->
    <div v-if='!open'
         class='work__timer'>
      <section>
        <div v-html='payload.title' />
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
        artists: [''],
        content: [],
        date: '',
        title: '',
        id: ''
      },
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
    firstImage() {
      const img = this.content.find(c => c.media === 'Image')
      if (img) {
        return 'https://ipfs.io/ipfs/' + img.hash
      } else {
        return false
      }
    },
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
    }
  },
  components: {
    VueTyper
  },
  watch: {
    'payload.date'() {
      this.open = isPast(parse(this.payload.date))
      this.timerId = countdown(
        new Date(this.payload.date),
        ts => {
          this.timeToPublish = ts.toString()
        },
        countdown.SECONDS
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
            this.content.push(body)
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
  transition: background 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

  &--open {
    cursor: pointer;
    i {
      color: $green;
    }
    &:hover {
      transition: background 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
      background: $green;
      i {
        color: $black;
      }
    }
  }

  &--closed {
    i {
      color: $red;
    }
    &:hover {
      transition: background 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);

      background: $red;
      i {
        color: $black;
      }
    }
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

  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
    will-change: opacity;
    transition: opacity 0.4s ease-out;
    @include center;
  }

  &__timer {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px !important;
    line-height: 64px !important;
    text-align: center;
    z-index: 1000;
    section {
      @include center;
      z-index: 10;
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
  z-index: 5;
}
</style>
