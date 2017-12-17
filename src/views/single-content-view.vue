<template>
  <div class='single-content'>
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
  </div>
</template>

<script>
import request from 'browser-request'
import work from '@/components/work'
export default {
  name: 'singleContentView',
  components: {
    work
  },
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
    request(
      {
        method: 'GET',
        url: 'https://ipfs.io/ipfs/' + this.$route.params.hash,
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
      }
    )
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

.single-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
