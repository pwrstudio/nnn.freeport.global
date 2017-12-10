<template>
  <router-link :to='{name: "singleContent", params: {slug: slug}}'
               class='atom'
               :class='sizeClass'>
    <div class='atom__title'
         v-html='title' />
    <div v-if='type === "Text"'
         class='atom__text'
         v-html='text' />
  </router-link>
</template>

<script>
export default {
  name: 'contentAtom',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Default title'
    },
    slug: {
      type: String,
      required: false,
      default: 'xxxx'
    },
    type: {
      type: String,
      required: false,
      default: 'Text'
    },
    text: {
      type: String,
      required: false,
      default: 'xxxkskskskx'
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.atom {
  height: 40vh;
  position: relative;
  padding: 40px;
  margin: 40px;
  cursor: pointer;
  background: red;

  &--small {
    flex: 1 1 500px;

    time {
      font-size: 22px;
    }
  }

  &--medium {
    flex: 1 1 700px;

    time {
      font-size: 32px;
    }
  }

  &--large {
    flex: 1 1 1000px;

    time {
      font-size: 52px;
    }
  }

  &__image {
    opacity: 0;
    max-height: 90%;
    max-width: 90%;
    object-fit: cover;
    will-change: opacity;
    transition: opacity 0.4s ease-out;

    @include center;
  }

  &__timer {
    color: white;
    width: 100%;
    text-align: center;
    z-index: 1000;

    @include center;
  }

  &__hash {
    color: white !important;
    padding: 20px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 1000;
    top: 20px;
    right: 20px;
    transform-origin: top right;
    transform: rotateZ(90deg) translateX(100%);
    border: 1px solid white;
    width: calc(40vh - 40px);
    white-space: nowrap;
    overflow: hidden;
  }

  &__title {
    color: white !important;
    padding: 20px;
    word-break: break-all;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    bottom: 20px;
    left: 20px;
    border: 1px solid white;
    white-space: nowrap;
    overflow: hidden;
  }

  &__counter {
    color: white !important;
    padding: 20px;
    word-break: break-all;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    top: 20px;
    left: 20px;
    border: 1px solid white;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
