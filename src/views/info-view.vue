<template>
  <div class='info'>

    <div class='info__main'>
      <div class='info__main__overlay'/>
      <span v-html='main.container.about.info'/>
    </div>
    <div class='info__credits'>
      <div class='info__credits__overlay'/>
      <span v-html='main.container.about.credits'/>
    </div>
    <div class='info__tech'>
      <div class='info__tech__overlay'/>
      <span v-html='main.container.about.tech'/>
    </div>
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

@mixin bluroverlay {
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + 60px);
    height: 100%;
    box-shadow: inset -20px -30px 30px $black;
  }
}

@mixin infobox {
  position: absolute;
  padding: 30px;
  color: white;
  overflow-y: auto;
  overflow-x: hidden;
  @include hide-scroll;
  @include bluroverlay;
}

@mixin secondary {
  @include infobox;
  width: calc(50vw - 100px);
  font-size: 14px;
  line-height: 20px;
  top: calc(50vh + 80px);
  height: calc(50vh - 200px);
}

@mixin primary {
  @include infobox;
  top: 80px;
  left: 30px;
  height: calc(50vh - 80px);
  width: calc(100vw - 120px);
  font-size: 20px;
  line-height: 24px;
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

svg {
  width: 300px;
}
.cls-1 {
  fill: $green;
}
</style>
