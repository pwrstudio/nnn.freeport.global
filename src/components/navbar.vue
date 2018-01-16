<template>
  <div class='atom'>
  
  <!-- INFO -->
  <!-- INFO -->
  <!-- INFO -->
  <template v-if='$route.name === "info"'>
    <router-link 
                 class='nav-button nav-button__left'
                 to='/'>
      nnn.freeport.global
    </router-link>
    <router-link
                 class='nav-button nav-button__right'
                 to='/'>
      <i class="material-icons">trending_up</i>
    </router-link>
    </template>
    <!-- END: INFO -->

    <!-- STATUS -->
    <!-- STATUS -->
    <!-- STATUS -->
    <template v-if='$route.name === "status"'>
      <router-link 
                  class='nav-button nav-button__left'
                  to='/info'>
        nnn.freeport.global
      </router-link>
      <router-link v-if='main.currentSlide' class='nav-button nav-button__right' :to='{name: "stack", params: {unit: main.currentSlide}}'>
        <i class="material-icons">menu</i>
      </router-link>
      <router-link v-else class='nav-button nav-button__right' :to='{name: "stack"}'>
        <i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: STATUS -->

    <!-- STACK -->
    <!-- STACK -->
    <!-- STACK -->
    <template v-if='$route.name === "stack"'>
      <router-link 
                  class='nav-button nav-button__left'
                  to='/info'>
        nnn.freeport.global
      </router-link>
      <router-link
                  class='nav-button nav-button__right'
                  to='/'>
        <i class="material-icons">trending_up</i>
      </router-link>
    </template>
    <!-- END: STACK -->

    <!-- SINGLE WORK-->
    <!-- SINGLE WORK-->
    <!-- SINGLE WORK-->
    <template v-if='$route.name === "singleWork" && !$route.params.info'>
      <router-link 
          :to='{name: "singleWork", params: {hash: $route.params.hash, info: "info"}}' 
          class='nav-button nav-button__left'>
          {{main.currentSingle}}
      </router-link>
      <router-link v-if='main.currentSlide' class='nav-button nav-button__right' :to='{name: "stack", params: {unit: main.currentSlide}}'>
        <i class="material-icons">menu</i>
      </router-link>
      <router-link v-else class='nav-button nav-button__right' :to='{name: "stack"}'>
        <i class="material-icons">menu</i>
      </router-link>
    </template>
      <!-- END: SINGLE WORK-->

    <!-- SINGLE WORK: INFO-->
    <!-- SINGLE WORK: INFO-->
    <!-- SINGLE WORK: INFO-->
    <template v-if='$route.name === "singleWork" && $route.params.info'>
      
      <router-link :to='{name: "singleWork", params: {hash: $route.params.hash}}' class='nav-button nav-button__left'>
        {{main.currentSingle}}
      </router-link>

      <router-link
                  class='nav-button nav-button__right'
                  :to='{name: "singleWork", params: {hash: $route.params.hash}}'>
        <i class="material-icons">close</i>
      </router-link>

    </template>
    <!-- END: SINGLE WORK: INFO-->

  </div>
</template>

<script>
import {mapState} from 'vuex'
import request from 'browser-request'
import ellipsize from 'ellipsize'
import videojs from 'video.js'
import AudioPlayer from './audio-player.vue'

export default {
  name: 'contentAtom',
  data() {
    return {
      payload: {
        media: '',
        hash: '',
        title: ''
      },
      text: '',
      externalLink: '',
      video: {
        player: {}
      }
    }
  },
  props: {
    hash: {
      type: String,
      required: false
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
        // TEXT
        if (this.payload.media === 'Text') {
          this.setIPFSText()
          // EXTERNAL LINK
        } else if (this.payload.media === 'External link') {
          this.getLink()
          // VIDEO
        } else if (this.payload.media === 'Video') {
          this.$nextTick(() => {
            const options = {}
            this.video.player = videojs('video-player', options, function onPlayerReady() {
              // this.on('ended', function() {
              //   videojs.log('Awww...over so soon?!')
              // })
            })
          })
        }
      }
    )
  },
  methods: {
    setIPFSText() {
      request('https://ipfs.io/ipfs/' + this.payload.hash, (error, response, body) => {
        if (error) {
          throw error
        }
        this.text = ellipsize(body, 480)
      })
    },
    getLink() {
      request('https://ipfs.io/ipfs/' + this.payload.hash, (error, response, body) => {
        if (error) {
          throw error
        }
        console.log(body)
        this.externalLink = body
      })
    }
  },
  components: {
    AudioPlayer
  },
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.atom {
  display: block;
  flex: 2 2 400px;
  margin: 20px;
  position: relative;
  text-decoration: none !important;

  &__image {
    cursor: pointer;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__text {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__link {
      border: 1px solid $white;
      color: $white;
      display: block;
      padding: 20px;
      margin: 20px;
      text-align: center;
      max-width: 200px;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
  }

  &__file {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__link {
      border: 1px solid $white;
      color: $white;
      display: block;
      padding: 20px;
      margin: 20px;
      text-align: center;
      max-width: 200px;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
  }

  &__audio {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__link {
      border: 1px solid $white;
      color: $white;
      display: block;
      padding: 20px;
      margin: 20px;
      text-align: center;
      max-width: 200px;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
  }

  &__external {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__link {
      border: 1px solid $white;
      color: $white;
      display: block;
      padding: 20px;
      margin: 20px;
      text-align: center;
      max-width: 200px;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
  }
}

.video-js {
  max-width: 100vw;
}
</style>
