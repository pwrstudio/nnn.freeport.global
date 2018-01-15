<template>
  <div>
    <router-link class='nav-button nav-button__left'
                 to=''>
      {{payload.title}}
    </router-link>
    <div class='work'>
      <contentAtom v-for='item in payload.content'
                   :key='item.hash'
                   :hash='item.hash' />
    </div>
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
        artists: [],
        content: [],
        data: '',
        id: '',
        title: ''
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
  align-items: center;
  justify-content: space-around;
  padding-top: 60px;
}
</style>
