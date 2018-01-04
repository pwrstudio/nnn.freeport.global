<template>
  <div class='work active'>

    <div class='work__sidebar'>
      <div class='work__counter'
           v-html='payload.content.length' />

      <div class='work__qr'>
        <qrcode :value="'https://nnn.freeport.global/w/' + hash"
                :options="{ size: 500, foreground: '#ffffff', background: '#000000'  }" />
      </div>
    </div>

    <div class='work__info'>

      <div class='work__hash'>
        <span class='work__hash__label'
              v-html='"hash"' />
        <span v-html='hash' />
      </div>

      <div class='work__title'>
        <span class='work__title__label'
              v-html='"title"' />
        <span v-html='payload.title' />
      </div>

      <div class='work__artist'>
        <span class='work__artist__label'
              v-html='"artist"' />
        <span v-html='payload.artists[0]' />
      </div>

      <div class='work__exhibition'>
        <span class='work__exhibition__label'
              v-html='"exhibition"' />
        <span v-html='"Territories of Complicity"' />
      </div>

      <div class='work__location'
           v-text=''>
        <span class='work__title__label'
              v-html='"location"' />
        <span v-html='"Berlin, Germany"' />
      </div>

      <div class='work__link'
           @click='goToWork({name: "singleWork", params: {hash: hash}})'>
        <i class="material-icons">arrow_forward</i>
      </div>

      <!-- <div class='work__signature' /> -->

    </div>

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
  padding-top: 40px;
  padding-bottom: 40px;

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
    padding: 20px;
    word-break: break-all;
    opacity: 0.7;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    left: 20px;
    white-space: nowrap;
    overflow: hidden;
    @include center;
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
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 68px;
    &:hover {
      background: $green;
    }
    @include screen-size('small') {
      width: 100%;
    }
  }
}
</style>
