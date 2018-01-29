<template>
  <div class='atom'
       :class='[getSizeClass(), getImageClass(), {"atom--loaded": payload.loaded}]'>

    <!-- TEXT -->
    <div v-if='payload.media === "Text"'
         class='atom__text'
         :id='hash'>
      <div class='atom__text__title'
           v-html='payload.title' />
      <span v-html='text' />
      <router-link class='atom__text__link'
                   :to='{name: "singleContent", params: {singleHash: hash}}'>
        <i class="material-icons">arrow_forward</i>
      </router-link>
    </div>
    <!-- END: TEXT -->

    <!-- IMAGE -->
    <router-link v-else-if='payload.media === "Image"'
                 class='atom__image'
                 :to='{name: "singleContent", params: {singleHash: hash}}'
                 :id='hash'>
      <img :src='getImageLink(payload.hash)'>
    </router-link>
    <!-- END: IMAGE -->

    <!-- AUDIO -->
    <div v-else-if='payload.media === "Audio"'
         class='atom__audio'
         :id='hash'>
      <audio-player :sources='["https://ipfs.io/ipfs/" + payload.hash]'
                    :loop='false'
                    :image='getImageLink(payload.poster)'
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
      <span v-html='payload.title + " (" + payload.size + ")"' />
      <img v-if='payload.poster'
           :src='getImageLink(payload.poster)' />
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
         :class='{"atom__external--has-image": payload.poster}'
         :id='hash'>
      <span class='atom__external__reference'
            v-if='payload.hierarchy === "Reference"'
            v-html='"Reference"' />
      <span v-if='!payload.poster'
            v-html='payload.title' />
      <img v-if='payload.poster'
           class='atom__external__image'
           :src='getImageLink(payload.poster)' />
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
import ImgixClient from 'imgix-core-js'
import ellipsize from 'ellipsize'
// import oembetter from 'oembetter'
import AudioPlayer from '@/components/content-atom/audio-player'
import VideoPlayer from '@/components/content-atom/video-player'

export default {
  name: 'contentAtom',
  data() {
    return {
      payload: {
        media: '',
        hash: '',
        title: '',
        size: 0,
        loaded: false
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
      if (this.payload.media === 'Text') {
        this.setIPFSText()
      } else if (this.payload.media === 'External link') {
        this.getLink()
      }
      this.payload.loaded = true
    })
    httpPromise.catch(console.log)
  },
  methods: {
    setIPFSText() {
      const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.payload.hash)
      httpPromise.then(response => {
        this.text = ellipsize(response.body, 480)
      })
      httpPromise.catch(console.log)
    },
    getLink() {
      const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.payload.hash)
      httpPromise.then(response => {
        this.externalLink = response.body
        // oembetter.fetch(this.externalLink, (err, embed) => {
        //   if (!err) {
        //     console.log(embed)
        //   }
        // })
      })
      httpPromise.catch(console.log)
    },
    getImageLink(imageHash) {
      const options = {w: 800, auto: 'compress,format'}
      const client = new ImgixClient({
        host: 'nnnfreeport.imgix.net',
        secureURLToken: 'A8qQj2zw8eqcXqEW'
      })
      let url = client.buildURL('https://ipfs.io/ipfs/' + imageHash, options)
      return url
    },
    getSizeClass() {
      let r = Math.random()
      if (r < 0.33) {
        return 'atom--small'
      }
      if (r > 0.66) {
        return 'atom--large'
      } else {
        return 'atom--medium'
      }
    },
    getImageClass() {
      console.log(this.payload.poster)
      if (
        this.payload.media === 'Image' ||
        this.payload.media === 'Audio' ||
        this.payload.media === 'Video' ||
        (this.payload.media === 'Link' && this.payload.poster)
      ) {
        return 'atom--image'
      } else {
        return ''
      }
    }
  },
  components: {
    AudioPlayer,
    VideoPlayer
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

.atom {
  display: none;
  margin: 20px;
  position: relative;
  text-decoration: none !important;
  height: auto;
  border: 1px solid $white;

  &--loaded {
    display: block;
  }

  &--small {
    flex: 2 1 300px;
  }
  &--medium {
    flex: 2 2 400px;
  }
  &--large {
    flex: 1 2 600px;
  }

  &--image {
    border: none;
  }

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
    color: white !important;
    padding: 20px;
    text-decoration: none !important;

    &__title {
      font-size: $font-size-small;
      margin-bottom: $line-height;
    }

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
    &__reference {
      float: right;
    }
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
    &--has-image {
      padding: 0;
      // width: 300px;
      height: 300px;
      border: none;
    }
    &--has-image &__link {
      @include center;
      border: none;
      color: $white;
      display: block;
      padding: 40px;
      padding: 40px;
      i {
        font-size: 96px;
      }
      text-align: center;
      max-width: none;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

video {
  max-width: 400px;
}
</style>
