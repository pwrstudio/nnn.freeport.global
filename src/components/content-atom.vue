<template>
  <div class='atom'>

    <!-- TEXT -->
    <div v-if='payload.media === "Text"'
         class='atom__text'
         :id='hash'>
      <span v-html='text' />
      <router-link class='atom__text__link'
                   :to='{name: "singleContent", params: {hash: hash}}'>
        <i class="material-icons">arrow_forward</i>
      </router-link>
    </div>
    <!-- END: TEXT -->

    <!-- IMAGE -->
    <router-link v-else-if='payload.media === "Image"'
                 class='atom__image'
                 :to='{name: "singleContent", params: {hash: hash}}'
                 :id='hash'>
      <img :src='"https://ipfs.io/ipfs/" + payload.hash'>
    </router-link>
    <!-- END: IMAGE -->

    <!-- AUDIO -->
    <div v-else-if='payload.media === "Audio"'
         class='atom__audio'
         :to='{name: "singleContent", params: {hash: hash}}'
         :id='hash'>
      <span v-html='payload.title' />
      <audio-player :sources='["https://ipfs.io/ipfs/" + payload.hash]'
                    :loop='true'
                    :formats='["mp3"]' />
    </div>
    <!-- END: AUDIO -->

    <!-- VIDEO -->
    <div v-else-if='payload.media === "Video"'
         class='atom__video'
         :id='hash'>
      <video id='video-player'
             class="video-js"
             controls
             preload="auto"
             data-setup="{}">
        <source :src='"https://ipfs.io/ipfs/" + payload.hash'
                type='video/mp4'>
        <p class="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to a web browser that
          <a href="http://videojs.com/html5-video-support/"
             target="_blank">supports HTML5 video</a>
        </p>
      </video>
    </div>
    <!-- END: VIDEO -->

    <!-- FILE -->
    <div v-if='payload.media === "File"'
         class='atom__file'
         :id='hash'>
      <span v-html='payload.title' />
      <a :href='"https://ipfs.io/ipfs/" + payload.hash'
         class='atom__file__link'
         target=_blank>
        <i class="material-icons">get_app</i>
      </a>
    </div>
    <!-- END: FILE -->

    <!-- LINK -->
    <div v-if='payload.media === "External link"'
         class='atom__external'
         :id='hash'>
      <span v-html='text' />
      <span v-html='payload.title' />
      <a :href='externalLink'
         class='atom__external__link'
         target=_blank>
        <i class="material-icons">open_in_new</i>
      </a>
    </div>
    <!-- END: LINK -->

  </div>
</template>

<script>
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
    const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.hash)
    httpPromise.then(response => {
      this.payload = response.body
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
    })
    httpPromise.catch(err => {
      console.log(err)
    })
  },
  methods: {
    setIPFSText() {
      const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.payload.hash)
      httpPromise.then(response => {
        this.text = ellipsize(response.body, 480)
      })
      httpPromise.catch(err => {
        console.log(err)
      })
    },
    getLink() {
      const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.payload.hash)
      httpPromise.then(response => {
        this.externalLink = response.body
      })
      httpPromise.catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    AudioPlayer
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
