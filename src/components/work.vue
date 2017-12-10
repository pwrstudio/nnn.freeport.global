<template>
  <router-link :to='{name: "singleWork", params: {slug: slug}}'
               class='work'
               :class='sizeClass'>
    <logo/>
    <div class='work__title'
         v-html='title' />
    <img :src='image'
         class='work__image'>
    <vue-typer :text='hash'
               erase-style='clear'
               class='work__hash' />
    <vue-countdown-2 :deadline="date"
                     format="%Dd %hh %mm %ss"
                     class='work__timer' />
    <div class='work__counter'
         v-html='counter' />
  </router-link>
</template>

<script>
import VueCountdown2 from 'vue-countdown-2'
import {VueTyper} from 'vue-typer'
import logo from '@/components/logo'

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
      required: false,
      default: 'static/44.jpg'
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
    logo
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
  cursor: pointer;
  // background: grey;
  background-image: url('../assets/img/grid.png');

  &:active {
    background: darkgrey;
  }

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
    mix-blend-mode: lighten;
    max-height: 90%;
    max-width: 90%;
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
