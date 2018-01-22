<template>
  <div class='info'>
    <div class='info__main'>
      <div class='info__main__overlay' />
      <span v-html='formattedInfo' />
    </div>
    <div class='info__credits'>
      <div class='info__credits__overlay' />
      <span v-html='formattedCredits' />
    </div>
    <div class='info__tech'>
      <div class='info__tech__overlay' />
      <span v-html='formattedTech' />
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
    top: 0;
    left: 0;
    width: calc(100% + 60px);
    height: 100%;
    box-shadow: inset -20px -30px 30px $black;
  }

  @include screen-size('small') {
    position: static;
  }
}

@mixin secondary {
  @include infobox;
  width: calc(50vw - 100px);
  font-size: 14px;
  line-height: 20px;
  top: calc(50vh + 80px);
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
    @include secondary;
    left: 30px;
  }

  &__tech {
    @include secondary;
    left: calc(50vw + 10px);
  }
}
</style>
