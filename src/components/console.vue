<template>
  <div id='console'>
    <span class='box'>Ethereum contract address:
      <a href='https://rinkeby.etherscan.io/address/0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A'
         target=_blank
         v-html='"0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A"' />
    </span>
    <span class='box'>IPFS root hash:
      <a :href='"http://ipfs.io/ipfs/" + main.rootHash'
         target=_blank
         v-text='main.rootHash' />
    </span>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'console',
  props: {},
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

#console {
  position: fixed;
  width: 100%;
  padding: 5px;
  // height: 60px;
  cursor: pointer;
  z-index: 1000;
  background: yellow;
  top: 0;
  left: 0;
  font-size: 12px;
}
</style>
