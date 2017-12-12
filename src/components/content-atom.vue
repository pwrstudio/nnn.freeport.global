<template>
  <router-link :to='{name: "singleContent", params: {exhibition:  $route.params.exhibition, work: $route.params.work, content: slug}}'
               class='atom'
               :class='[sizeClass, hash]'>
    <div class='atom__title'
         v-html='title' />
    <div v-if='type === "Text"'
         class='atom__text'
         v-html='text' />
    <img v-else-if='type === "Image"'
         :src='"https://ipfs.io/ipfs/" + hash'
         class='atom__image' />
    <div v-else-if='type === "Audio"'
         class='atom__audio'>
      <audio :src='"https://ipfs.io/ipfs/" + hash'
             controls/>
    </div>
    <div v-else-if='type === "Video"'
         class='atom__audio'>
      <video :src='"https://ipfs.io/ipfs/" + hash'
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
      text: ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    hash: {
      type: String,
      required: false
    }
  },
  mounted() {
    // this.$notify({
    //   group: 'global',
    //   type: 'content',
    //   title: 'Loading from IPFS',
    //   text: this.hash
    // })
    if (this.type === 'Text') {
      this.setIPFSText()
    }
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
      request('https://ipfs.io/ipfs/' + this.hash, (error, response, body) => {
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
