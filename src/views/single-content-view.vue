<template>
  <div class='single-content'>
    <div v-if='matchedContent.media === "Text"'
         class='atom__text'
         v-html='text' />
    <img v-else-if='matchedContent.media === "Image"'
         :src='"https://ipfs.io/ipfs/" + matchedContent.ipfs[0].hash'
         class='atom__image' />
    <div v-else-if='matchedContent.media === "Audio"'
         class='atom__audio'>
      <audio :src='"https://ipfs.io/ipfs/" + matchedContent.ipfs[0].hash'
             controls/>
    </div>
    <div v-else-if='matchedContent.media === "Video"'
         class='atom__audio'>
      <video :src='"https://ipfs.io/ipfs/" + matchedContent.ipfs[0].hash'
             controls/>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import request from 'browser-request'
import work from '@/components/work'
export default {
  name: 'singleContentView',
  props: [],
  components: {
    work
  },
  computed: {
    ...mapState(['main']),
    matchedContent() {
      let exhibition = this.main.container.exhibitions.find(
        e => e.slug === this.$route.params.exhibition
      )
      if (exhibition) {
        let work = exhibition.works.find(w => w.slug === this.$route.params.work)
        if (work) {
          let content = work.content.find(c => c.slug === this.$route.params.content)
          if (content) {
            return content
          } else {
            return []
          }
        } else {
          return []
        }
      } else {
        return []
      }
    }
  },
  mounted() {
    console.dir(this.main.container.exhibitions[0])
  },
  methods: {
    setIPFSText(hash) {
      request('https://ipfs.io/ipfs/' + hash, (error, response, body) => {
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
