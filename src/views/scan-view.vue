<template>
  <div class='scanner'>
    <!-- IN BROWSER SCANNER -->
    <template v-if='!iOS.check'>
      <video id='preview'
             class='scanner__preview' />
      <i class="material-icons scanner__crosshair">crop_free</i>
      <div v-if='resultHash.length > 0'
           class='scanner__success'>
        <div class='scanner__success__inner'>
          <div v-html='resultHash' />
        </div>
      </div>
    </template>

    <template v-else>
      <i class="material-icons scanner__crosshair scanner__crosshair--error">crop_free</i>
      <p class="scanner__error">
        QR SCANNER<br/> UNAVAILABLE
      </p>
    </template>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import Instascan from 'instascan'

export default {
  name: 'scanView',
  data() {
    return {
      iOS: {
        check: false,
        version: ''
      },
      scanner: {},
      resultHash: ''
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    this.checkiOS()
    if (!this.iOS.check) {
      this.scanner = new Instascan.Scanner({
        video: document.getElementById('preview'),
        continuous: true,
        mirror: false
      })
      Instascan.Camera.getCameras()
        .then(cameras => {
          if (cameras[1]) {
            this.scanner.start(cameras[1])
          } else {
            this.scanner.start(cameras[0])
          }
        })
        .catch(e => {
          console.log(e)
        })
      // Listen for scan events
      this.scanner.addListener('scan', content => {
        const matchingWork = this.main.container.works.find(w => {
          return w.id === content
        })
        if (matchingWork) {
          this.resultHash = matchingWork.hash
          this.scanner.stop().then(() => {
            window.setTimeout(() => {
              this.$router.push({name: 'singleWork', params: {hash: this.resultHash}})
            }, 2000)
          })
        }
      })
    }
  },
  methods: {
    checkiOS() {
      let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
      if (iOS) {
        this.iOS.check = true
        let ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
        this.iOS.version = [parseInt(ver[1], 10), parseInt(ver[2], 10), parseInt(ver[3] || 0, 10)]
      } else this.iOS.check = false
    }
  },
  watch: {
    'iOS.check'() {
      // redirect to list view
      if (this.iOS.check) this.$router.push({name: 'stack'})
    }
  },
  beforeDestroy() {
    if (!this.iOS.check) this.scanner.stop()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/vendor/swiper.css';

.scanner {
  position: fixed;
  top: 0px;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include hide-scroll;

  &__input {
    font-family: 'space mono', $sans-serif-stack;
    padding: 30px;
    background: $red;
    color: $black;

    @include center;
  }

  &__preview {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }

  &__crosshair {
    @include center;

    top: 45%;
    font-size: 70vw;
    opacity: 0.7;
    color: $white;

    &--error {
      color: $red;
      opacity: 1;
      transform: translateX(-35vw) rotate(45deg);
    }
  }

  &__error {
    color: $red;
    width: 100%;
    height: auto;
    position: fixed;
    display: block;
    text-align: center;
    margin: 0;

    @include center;
  }

  &__success {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $green;
    color: $white;
    height: 100vh;
    left: 0;
    line-height: 100vh;
    position: fixed;
    text-align: center;
    top: 0;
    width: 100vw;
    z-index: 100000;

    &__inner {
      word-wrap: break-word;
      font-size: $font-size-medium;
      line-height: 32px;
      max-width: 95vw;
    }
  }
}
</style>
