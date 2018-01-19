<template>
  <div class='single-content'>
    <div v-if='payload.media === "Text"'
         class='single-content__text'
         v-html='text' />
    <img v-else-if='payload.media === "Image"'
         :src='"https://ipfs.io/ipfs/" + payload.hash'
         class='single-content__image' />
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
      httpPromise.catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.single-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  &__text {
    color: $white;
    width: 70ch;
    max-width: 90%;
  }
  &__image {
    max-width: 80vw;
    max-height: 90vh;
  }
}
</style>
