<template>
  <div class='single-content'>
    <div v-if='payload.media === "Text"'
         class='single-content__text'>
         <div class='single-content__text__inner' v-html='text'/>
    </div>
    <div v-else-if='payload.media === "Image"'class='single-content__image'>
      <div class='single-content__image__inner'>
        <img :src='getImageLink(payload.hash)'/>
        <div v-if='payload.caption' v-html='payload.caption'/>
      </div>
    </div>
    <div v-else-if='payload.media === "Audio"'
        class='single-content__audio'>
      <audio :src='"https://ipfs.io/ipfs/" + payload.hash'
            controls/>
    </div>
    <div v-else-if='payload.media === "Video"'
         class='single-content__audio'>
      <video :src='"https://ipfs.io/ipfs/" + payload.hash'
             controls/>
    </div>
  </div>
</template>

<script>
import ImgixClient from 'imgix-core-js'
import marked from 'marked'

export default {
  name: 'singleContentView',
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
  mounted() {
    const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.$route.params.hash)
    httpPromise.then(response => {
      this.payload = response.body
      if (this.payload.media === 'Text') {
        this.setIPFSText()
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
        this.text = marked(response.body)
      })
      httpPromise.catch(console.log)
    },
    getImageLink(imageHash) {
      const options = {w: 1600, auto: 'compress,format'}
      const client = new ImgixClient({
        host: 'nnnfreeport.imgix.net',
        secureURLToken: 'A8qQj2zw8eqcXqEW'
      })
      let url = client.buildURL('https://ipfs.io/ipfs/' + imageHash, options)
      return url
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.single-content {
  &__text {
    position: fixed;
    top: 80px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 80px);
    overflow-x: hidden;
    overflow-y: auto;
    @include hide-scroll;

    &__inner {
      margin: auto;
      color: $white;
      width: 70ch;
      max-width: 90%;
      max-height: 80vh;
      padding-bottom: 200px;
    }
  }

  &__image {
    position: fixed;
    top: 0px;
    left: 0;
    width: 100vw;
    height: 100vh;
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
    // justify-content: center;

    &__inner {
      max-width: 95vw;
      max-height: 85vh;
      @include center;
      color: $white;
    }
  }
}

img {
  max-width: 100%;
  max-height: 100%;
}
</style>
