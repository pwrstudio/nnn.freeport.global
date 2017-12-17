<template>
  <router-link :to='{name: "singleContent", params: {hash: hash}}'
               class='atom'
               :class='[sizeClass, hash]'>
    <div class='atom__title'
         v-html='payload.title' />
    <div v-if='payload.media === "Text"'
         class='atom__text'
         v-html='text' />
    <img v-else-if='payload.media === "Image"'
         :src='"https://ipfs.io/ipfs/" + payload.hash'
         class='atom__image' />
    <div v-else-if='payload.media === "Audio"'
         class='atom__audio'>
      <audio :src='"https://ipfs.io/ipfs/" + payload.hash'
             controls/>
    </div>
    <div v-else-if='payload.media === "Video"'
         class='atom__audio'>
      <video :src='"https://ipfs.io/ipfs/" + payload.hash'
             controls/>
    </div>
  </router-link>
</template>

<script>
import request from 'browser-request'

export default {
  name: 'contentAtom',
  data() {
    return {
      payload: {
        media: '',
        hash: '',
        title: ''
      },
      text: ''
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
        if (this.payload.media === 'Text') {
          this.setIPFSText()
        }
        this.$notify({
          group: 'global',
          type: 'content',
          title: this.payload.title + ' – ' + this.payload.artists[0]
        })
      }
    )
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'large':
          return 'atom--large'
        case 'medium':
          return 'atom--medium'
        default:
          return 'atom--small'
      }
    }
  },
  methods: {
    setIPFSText() {
      request('https://ipfs.io/ipfs/' + this.payload.hash, (error, response, body) => {
        if (error) {
          throw error
        }
        this.text = body
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.atom {
  height: 40vh;
  position: relative;
  margin: 40px;
  cursor: pointer;
  display: block;
  text-decoration: none !important;
  flex: 1 1 700px;

  // &--small {
  //   flex: 1 1 500px;
  // }

  // &--medium {
  //   flex: 1 1 700px;
  // }

  // &--large {
  //   flex: 1 1 1000px;
  // }

  &__image {
    max-height: 100%;
    max-width: 100%;
    object-fit: cover;
    will-change: opacity;
    transition: opacity 0.4s ease-out;

    @include center;
  }

  &__timer {
    color: white;
    width: 100%;
    text-align: center;
    z-index: 1000;

    @include center;
  }

  &__title {
    color: white !important;
    padding: 20px;
    word-break: break-all;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    bottom: 20px;
    left: 20px;
    border: 1px solid white;
    white-space: nowrap;
    overflow: hidden;
  }

  &__text {
    padding: 20px;
    color: white !important;
    font-size: 24px;
    line-height: 24px;
    text-decoration: none !important;
  }
}
</style>
