<template>
  <div class='video-player'>
    <video preload='auto'
           class='video-player__video'>
      <source :type='type'
              :src='"https://cloudflare-ipfs.com/ipfs/" + hash' />
    </video>
    <progress class='video-player__progress'
              :class='{"video-player__progress--playing": playing}'
              max="1"
              :value="progress" />
    <div class='video-player__toggle'
         @click="toggleVideo">
      <i v-if='playing'
         class="material-icons video-player__toggle__icon video-player__toggle__icon--pause">pause</i>
      <i v-else
         class="material-icons video-player__toggle__icon">play_arrow</i>
    </div>
    <div class='video-player__controls'>
      <div class='video-player__controls__title'
           v-html='title' />
      <div class='video-player__controls__timecode'>
        <span v-html='formatTime(video.currentTime)'></span> /
        <span v-html='formatTime(video.duration)'></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      video: {
        duration: 0,
        currentTime: 0
      },
      playing: false
    }
  },
  methods: {
    formatTime(time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time - minutes * 60)
      return (
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds)
      )
    },
    toggleVideo() {
      if (!this.playing) {
        this.video.play()
        this.playing = true
      } else {
        this.video.pause()
        this.playing = false
      }
    }
  },
  props: {
    hash: {
      type: String
    },
    type: {
      type: String
    },
    title: {
      type: String
    }
  },
  mounted() {
    this.video = this.$el.getElementsByTagName('video')[0]
  }
}
</script>

<style scoped lang='scss'>
@import '../../style/helpers/_mixins.scss';
@import '../../style/helpers/_responsive.scss';
@import '../../style/_variables.scss';

@mixin progress-bar {
  background-color: transparent;
}

@mixin progress-value {
  background-color: $red;
}

.video-player {
  color: $white;
  // width: 400px;

  &__progress {
    appearance: none;
    border: none;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    z-index: 100;
    cursor: pointer;
    @include progress-bar;
    &--playing {
      &::-webkit-progress-value {
        background-color: $green;
      }
    }
  }

  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__toggle {
    cursor: pointer;
    @include center;

    &__icon {
      font-size: 96px;
      user-select: none;
      color: $white;

      &--pause {
        display: none;
      }
    }
  }

  &__controls {
    position: absolute;
    top: 10px;
    left: 10px;
    width: calc(100% - 20px);
    z-index: 100;

    &__timecode {
      float: right;
      font-size: $font-size-small;
    }

    &__title {
      float: left;
    }
  }
  &__video {
    width: 100%;
  }
}

progress::-webkit-progress-bar {
  @include progress-bar;
}
progress::-webkit-progress-value {
  @include progress-value;
}
progress::-moz-progress-bar {
  @include progress-bar;
}

.video-player:hover .video-player__toggle__icon--pause {
  display: block;
}
</style>
