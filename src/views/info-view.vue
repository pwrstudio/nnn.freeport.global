<template>
  <div class='info'>
    <div class='info__main'>
      <span v-html='formattedInfo' />
      <div class='info__main__overlay' />
    </div>
    <div class='info__credits'>
      <span v-html='formattedCredits' />
    </div>
    <div class='info__tech'>
      <span class="info__tech__text"
            v-html='formattedTech' />
      <div class='info__tech__overlay' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import marked from 'marked'

export default {
  name: 'infoView',
  computed: {
    ...mapState(['main']),
    formattedInfo() {
      return marked(this.main.container.about.info)
    },
    formattedCredits() {
      return marked(this.main.container.about.credits)
    },
    formattedTech() {
      return marked(this.main.container.about.tech)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

@mixin overlay {
  &__overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset -20px -30px 30px black;
  }
}

// @mixin infobox {
//   @include hide-scroll;
//
//   color: $white;
//   overflow-y: auto;
//   overflow-x: hidden;
//   padding: 30px;
//   position: absolute;
//
//   &__overlay {
//     position: absolute;
//     width: calc(100% + 60px);
//     height: 100%;
//     bottom: 0;
//     pointer-events: none;
//     box-shadow: inset -20px -30px 30px black;
//   }
//
//   @include screen-size('small') {
//     position: static;
//   }
// }
//
// @mixin secondary($left) {
//   @include infobox;
//   width: calc(50vw - 100px);
//   font-size: 14px;
//   line-height: 20px;
//   top: calc(50vh + 80px);
//   left: $left;
//   height: calc(50vh - 200px);
//
//   @include screen-size('small') {
//     height: auto;
//     width: calc(100vw - 120px);
//     font-size: 13px;
//     line-height: 16px;
//   }
// }
//
// @mixin primary {
//   @include infobox;
//   top: 80px;
//   left: 0px;
//   height: calc(50vh - 80px);
//   width: calc(100vw - 60px);
//   font-size: 20px;
//   line-height: 24px;
//
//   @include screen-size('small') {
//     margin-top: 50px;
//     height: auto;
//     font-size: 15px;
//     line-height: 18px;
//   }
// }

.info {
  color: $white;
  display: grid;
  height: calc(100vh - 80px);
  padding-top: 80px;
  grid-gap: 0;
  grid-auto-rows: minmax(10vh, 40vh);
  grid-template-rows: max-content;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
  'main main'
  'credits tech';

  @include screen-size('small') {
    height: auto;
    grid-auto-rows: min-content;
    grid-template-columns: 100%;
    grid-template-areas:
    'main'
    'credits'
    'tech';
  }

  &__main {
    grid-area: main;
    padding: 30px;
    font-size: 20px;
    line-height: 24px;
    @include overlay;
    // @include primary;
  }

  &__credits {
    grid-area: credits;
    padding: 30px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
    overflow-y: scroll;
    @include overlay;
    // @include secondary(30px);
  }

  &__tech {
    grid-area: tech;
    padding: 30px;
    font-size: 14px;
    line-height: 20px;
    position: relative;
    overflow-y: scroll;
    @include hide-scroll;
    @include overlay;

    @include screen-size('small') {
      padding-bottom: 120px;
    }
    // @include secondary(calc(50vw + 30px));
  }
}
</style>
