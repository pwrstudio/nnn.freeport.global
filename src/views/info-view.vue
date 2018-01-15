<template>
  <div class='info'>

    <div class='info__main' v-html='main.container.about.info'/>
    <div class='info__credits'>
      <svg class='info__credits__logo' id="Layer_1"
           data-name="Layer 1"
           xmlns="http://www.w3.org/2000/svg"
           width="808.5204"
           height="378.3499"
           viewBox="0 0 808.5204 378.3499">
        <polygon class="cls-1"
                 points="755.212 85.751 656.642 296.394 654.888 38.804 571.964 0 433.284 296.394 431.53 38.804 348.606 0 209.926 296.394 208.173 38.804 125.248 0 0 267.653 54.049 292.946 157.989 70.827 157.705 341.451 236.556 378.35 381.347 70.827 381.063 341.451 459.914 378.35 604.705 70.827 604.42 341.451 683.272 378.35 808.52 110.696 755.212 85.751" />
      </svg>
      <span v-html='main.container.about.credits'/>
    </div>
    <div class='info__tech' v-html='main.container.about.tech'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'infoView',
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.info {
  padding-top: 80px;

  &__main {
    float: left;
    color: white;
    font-size: 20px;
    line-height: 24px;
    max-width: 70;
    width: 60vw;
    max-width: 90%;
    padding: 30px;
    // @include screen-size('small') {
    //   width: 90vw;
    //   font-size: 18px;
    //   line-height: 20px;
    // }
  }
  &__credits {
    float: right;
    padding: 30px;
    color: white;
    font-size: 14px;
    line-height: 20px;
    max-width: 70;
    width: 30vw;
    max-width: 90%;
    @include screen-size('small') {
      width: 90vw;
      font-size: 18px;
      line-height: 20px;
    }
  }
  &__tech {
    float: left;
    color: white;
    padding: 30px;
    font-size: 14px;
    line-height: 20px;
    max-width: 70;
    width: 30vw;
    max-width: 90%;
    @include screen-size('small') {
      width: 90vw;
      font-size: 18px;
      line-height: 20px;
    }
  }
}

svg {
  width: 300px;
}
.cls-1 {
  fill: $green;
}
</style>
