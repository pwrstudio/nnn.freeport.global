<template>
  <div class='info'>
    <div class='info__main'>
      <span class='info__main__text'
            v-html='formattedInfo' />
    </div>
    <div class='info__credits'>
      <span class='info__credits__text'
            v-html='formattedCredits' />
    </div>
    <div class='info__tech'>
      <span class="info__tech__text"
            v-html='formattedTech' />
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

@mixin gradient-scroll {
  &__text {
    z-index: 1;
    position: absolute;
    height: 100%;
    padding: 0 30px;
    overflow-y: scroll;
    @include hide-scroll;

    &:after {
      content: '';
      display: block;
      height: 30px;
    }

    @include screen-size('small') {
      position: relative;
      height: auto;
      display: block;

      &:after {
        height: 0;
      }
    }
  }

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 30px;
    left: 0;
    bottom: 0;
    display: block;
    z-index: 2;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    background-size: 100% 100%;
    pointer-events: none;

    @include screen-size('small') {
      display: none;
    }
  }
}

@mixin primary {
  font-size: 20px;
  line-height: 24px;
  position: relative;
  overflow: hidden;
  height: 35vh;
  margin-bottom: 30px;
  @include gradient-scroll;

  @include screen-size('small') {
    height: auto;
  }
}

@mixin secondary {
  font-size: 14px;
  line-height: 20px;
  position: relative;
  clear: none;
  overflow: hidden;
  width: 50%;
  height: 28vh;
  @include gradient-scroll;

  @include screen-size('small') {
    height: auto;
    width: 100%;
  }
}

.info {
  color: $white;
  padding-top: 80px;
  height: calc(100vh - 80px);

  &__main {
    @include primary;
  }

  &__credits {
    float: left;
    @include secondary;
  }

  &__tech {
    float: right;
    @include secondary;

    &:after {
      content: '';
      display: block;
      height: 120px;
    }
  }
}
</style>
