<template>
  <router-link :to='{name: "singleContent", params: {hash: hash}}'
               class='atom'
               :id='hash'>
    <!-- <div class='atom__title'
         v-html='payload.title' /> -->
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
import ellipsize from 'ellipsize'

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
        this.text = ellipsize(body, 480)
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
  position: relative;
  cursor: pointer;
  display: block;
  text-decoration: none !important;
  margin: 20px;
  background: red;
  float: left;

  &__image {
    height: 400px;
  }

  // &__title {
  //   color: white !important;
  //   padding: 20px;
  //   word-break: break-all;
  //   font-size: 18px;
  //   line-height: 20px;
  //   text-align: center;
  //   position: absolute;
  //   z-index: 10;
  //   bottom: 20px;
  //   left: 20px;
  //   border: 1px solid white;
  //   white-space: nowrap;
  //   overflow: hidden;
  // }

  &__text {
    padding: 20px;
    color: white !important;
    font-size: 16px;
    line-height: 18px;
    text-decoration: none !important;
  }
}
</style>
