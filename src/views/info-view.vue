<template>
  <div class='info'>
    <div class='info__main'>
      <span v-html='formattedInfo' />
      <div class='info__main__overlay' />
    </div>
    <div class='info__credits'>
      <span v-html='formattedCredits' />
      <div class='info__credits__overlay' />
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

@mixin infobox {
  @include hide-scroll;

  color: $white;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
  position: absolute;

  &__overlay {
    position: absolute;
    width: calc(100% + 60px);
    height: 100%;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset -20px -30px 30px blue;
  }

  &__text {
    display: block;
    background: red;
  }

  @include screen-size('small') {
    position: static;
  }
}

@mixin secondary($left) {
  @include infobox;
  width: calc(50vw - 100px);
  font-size: 14px;
  line-height: 20px;
  top: calc(50vh + 80px);
  left: $left;
  height: calc(50vh - 200px);

  @include screen-size('small') {
    height: auto;
    width: calc(100vw - 120px);
    font-size: 13px;
    line-height: 16px;
  }
}

@mixin primary {
  @include infobox;
  top: 80px;
  left: 0px;
  height: calc(50vh - 80px);
  width: calc(100vw - 60px);
  font-size: 20px;
  line-height: 24px;

  @include screen-size('small') {
    margin-top: 50px;
    height: auto;
    font-size: 15px;
    line-height: 18px;
  }
}

.info {
  &__main {
    @include primary;
  }

  &__credits {
    @include secondary(30px);
  }

  &__tech {
    @include secondary(calc(50vw + 10px));
  }
}
</style>
