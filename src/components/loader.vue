<template>
  <div id='symbol'>
    <svg version="1.1"
         id="Layer_1"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         x="0px"
         y="0px"
         viewBox="0 0 879.1 864.1"
         style="enable-background:new 0 0 879.1 864.1;"
         xml:space="preserve">
      <path class="inner-square"
            d="M439.3,636.2L235.4,432.2l204.3-204.3l203.9,203.9L439.3,636.2z M375.6,432.2l63.7,63.7l64.2-64.2l-63.7-63.7L375.6,432.2z" />
      <path class="outer-square"
            d="M866,431.6L724.2,573.4l-70.1-70.1l71.7-71.7l-71.5-71.5l70.1-70.1L866,431.6z M580.9,716.7L439.1,858.5L297.6,716.9l70.1-70.1l71.5,71.5l71.7-71.7L580.9,716.7z M581.5,147.1l-70.1,70.1L440,145.8l-71.7,71.7l-70.1-70.1L440,5.6L581.5,147.1z M224.7,503.9L154.6,574L13.1,432.5l141.8-141.8l70.1,70.1l-71.7,71.7L224.7,503.9z" />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'loader',
  props: {}
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

#symbol {
  width: 160px;
  height: 160px;
  cursor: pointer;
  position: absolute;
  top: -30px;
  left: -30px;
  z-index: 10000;
  opacity: 0.7;

  svg {
    width: 160px;
    height: 160px;

    @include screen-size('medium') {
      width: 200px;
      height: 200px;
    }

    path {
      fill: white;
    }

    .inner-square {
      // transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
      transform: rotate(0deg);
      transform-origin: 50% 50%;
      animation: pulse2 15s infinite linear;
    }

    .outer-square {
      // transition: transform 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);
      transform: rotate(0deg);
      transform-origin: 50% 50%;
      animation: pulse 20s infinite linear;
    }

    @keyframes pulse {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes pulse2 {
      0% {
        transform: rotate(360deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  }
}
</style>
