<template>
  <div class='scanner'>
    <video id='preview'
           class='scanner__preview' />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Instascan from 'instascan'

export default {
  name: 'scanView',
  components: {},
  data() {
    return {
      scanner: {}
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    this.scanner = new Instascan.Scanner({
      video: document.getElementById('preview'),
      continuous: true
    })
    console.dir(this.scanner)
    this.scanner.addListener('scan', content => {
      console.log(content)
    })
    Instascan.Camera.getCameras()
      .then(cameras => {
        console.log(cameras[0])
        if (cameras.length > 0) {
          this.scanner.start(cameras[0])
        } else {
          console.error('No cameras found.')
        }
      })
      .catch(e => {
        console.log(e)
      })
  },
  methods: {},
  watch: {
    $route(to, from) {}
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';
@import '../style/vendor/swiper.css';

.scanner {
  background: $red;
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
  }
}
</style>
