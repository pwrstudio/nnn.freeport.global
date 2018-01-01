<template>
  <div class='work'>
    <contentAtom v-for='item in payload.content'
                 :key='item.hash'
                 :hash='item.hash' />
  </div>
</template>

<script>
import request from 'browser-request'
import contentAtom from '@/components/content-atom'
export default {
  name: 'singleWork',
  components: {
    contentAtom
  },
  data() {
    return {
      payload: {
        content: [],
        title: '',
        artists: []
      }
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
        this.$notify({
          group: 'global',
          type: 'content',
          title: this.payload.title + ' – ' + this.payload.artists[0]
        })
      }
    )
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.work {
  display: flex;
  flex-wrap: wrap;

  header {
    width: 100%;
    justify-content: center;
    align-items: center;
    div {
      margin-top: 40px;
      text-align: center;
      color: $white;
    }
  }
}
</style>
