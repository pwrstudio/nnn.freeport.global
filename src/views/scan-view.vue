<template>
  <div class='scanner'>
    <video id='preview'
           class='scanner__preview' />
    <i class="material-icons scanner__crosshair">crop_free</i>
    <div v-if='resultHash.length > 0' class='scanner__success' v-html='resultHash'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Instascan from 'instascan'

export default {
  name: 'scanView',
  data() {
    return {
      scanner: {},
      resultHash: ''
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
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
      // console.log('scanned content', content, typeof content)
      const matchingWork = this.main.container.works.find(w => {
        // console.log(w.id)
        return w.id === content
      })
      if (matchingWork) {
        // console.log('matching', matchingWork.hash)
        this.resultHash = matchingWork.hash
        this.scanner.stop().then(() => {
          window.setTimeout(() => {
            this.$router.push({name: 'singleWork', params: {hash: this.resultHash}})
          }, 2000)
        })
      }
    })
  },
  beforeDestroy() {
    this.scanner.stop()
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

  &__preview {
    width: 100vw;
    height: 100vh;
    background: blue;
    object-fit: cover;
  }

  &__crosshair {
    @include center;
    top: 45%;
    font-size: 70vw;
    opacity: 0.7;
    color: $white;
  }

  &__success {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $green;
    z-index: 100000;
    text-align: center;
    line-height: 100vh;
    color: $white;
  }
}
</style>
