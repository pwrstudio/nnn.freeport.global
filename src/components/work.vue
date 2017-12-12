<template>
  <router-link :to='{name: "singleWork", params: {exhibition: "territories-of-complicity", work: slug}}'
               class='work'
               :class='[{"active": active}, sizeClass]'>
    <div v-if='!active'
         class='mesh' />
    <!-- <loader/> -->
    <div v-if='active'
         class='work__title'
         v-html='title' />
    <img :src='image'
         class='work__image'>
    <vue-typer v-if='active'
               :text='hash'
               erase-style='clear'
               class='work__hash' />
    <vue-countdown-2 v-if='date && !active'
                     :deadline="date"
                     format="%Dd %hh %mm %ss"
                     class='work__timer' />
    <div v-if='active'
         class='work__counter'
         v-html='counter' />
  </router-link>
</template>

<script>
import VueCountdown2 from 'vue-countdown-2'
import {VueTyper} from 'vue-typer'
import loader from '@/components/loader'

export default {
  name: 'work',
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
    content: {
      type: Array,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true
    },
    date: {
      type: String,
      required: false,
      default: '2018/02/29'
    },
    hash: {
      type: String,
      required: false,
      default: '2018/02/29'
    },
    size: {
      type: String,
      required: false,
      default: 'small'
    },
    counter: {
      type: Number,
      required: false,
      default: 4
    }
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'large':
          return 'work--large'
        case 'medium':
          return 'work--medium'
        default:
          return 'work--small'
      }
    }
  },
  components: {
    VueCountdown2,
    VueTyper,
    loader
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.work {
  height: 40vh;
  position: relative;
  padding: 40px;
  margin: 40px;
  cursor: normal;
  // border: 1px solid white;

  .mesh {
    background-image: url('../assets/img/grid.png');
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &.active {
    cursor: pointer;

    &:hover {
      background: orangered;
    }

    &:active {
      background: orangered;
    }
  }

  &--small {
    flex: 1 1 400px;
  }

  &--medium {
    flex: 1 1 500px;
  }

  &--large {
    flex: 1 1 700px;
  }

  &__image {
    mix-blend-mode: lighten;
    max-height: 80%;
    max-width: 70%;
    object-fit: cover;
    will-change: opacity;
    transition: opacity 0.4s ease-out;
    @include center;
  }

  &:hover {
    &__image {
      opacity: 1;
    }
  }

  &__timer {
    // background: white;
    color: white;
    padding: 20px;
    word-break: break-all;
    font-size: 18px;
    line-height: 20px;
    text-align: center;
    position: absolute;
    z-index: 10;
    left: 20px;
    border: 2px solid white;
    white-space: nowrap;
    overflow: hidden;
    // font-size: 32px;
    // @include center-vertical;
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
    left: 20px;
    // top: 20px;
    // right: 20px;
    // transform-origin: top right;
    // transform: rotateZ(90deg) translateX(100%);
    border: 1px solid white;
    width: 400px;
    // width: 100%;
    white-space: nowrap;
    overflow: hidden;

    .caret {
      opacity: 0 !important;
      visibility: hidden !important;

      &.typing {
        opacity: 0 !important;
      }
    }

    .char {
      color: white !important;
      .typed {
        color: white !important;
      }
    }
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
    left: 100px;
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
    bottom: 20px;
    left: 20px;
    border: 1px solid white;
    white-space: nowrap;
    overflow: hidden;
  }
}

.caret {
  opacity: 0 !important;
  visibility: hidden !important;

  &.typing {
    opacity: 0 !important;
  }
}

.char {
  color: white !important;
  .typed {
    color: white !important;
  }
}
</style>
