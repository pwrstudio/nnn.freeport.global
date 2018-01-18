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
      <audio-player :sources='["https://ipfs.io/ipfs/" + payload.hash]'
                    :loop='false'
                    image='/static/test.jpg'
                    :title='payload.title'
                    :formats='["mp3"]' />
    </div>
    <!-- END: AUDIO -->

    <!-- VIDEO -->
    <div v-else-if='payload.media === "Video"'
         class='atom__video'
         :id='hash'>
               <video-player :sources='["https://ipfs.io/ipfs/" + payload.hash]'
                    image='/static/test.jpg'
                    :title='payload.title'
                    :hash='payload.hash'
                    type='video/mp4' />
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
import AudioPlayer from '@/components/audio-player.vue'
import VideoPlayer from '@/components/video-player.vue'

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
        options: {}
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
        console.log('link')
        this.getLink()
        // VIDEO
      }
      // else if (this.payload.media === 'Video') {
      //   this.$nextTick(() => {
      //     this.video.options = {
      //       sources: [{}]
      //     }
      //   })
      // }
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
      console.log('getlink')
      console.log(this.payload.hash)

      const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.payload.hash)
      httpPromise.then(response => {
        console.log(response.body)

        this.externalLink = response.body
      })
      httpPromise.catch(err => {
        console.log(err)
      })
    }
  },
  components: {
    AudioPlayer,
    VideoPlayer
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

video {
  max-width: 400px;
}
</style>
