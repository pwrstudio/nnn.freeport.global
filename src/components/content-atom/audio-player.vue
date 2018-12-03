<template>
  <div class="audio-player">
    <img class="audio-player__image" :src="image" />
    <progress
      class="audio-player__progress"
      id="timeline"
      @click="scrub"
      :class="{ 'audio-player__progress--playing': playing }"
      max="1"
      :value="progress" />
    <div class="audio-player__toggle" @click="togglePlayback">
      <i v-if="playing" class="material-icons audio-player__toggle__icon">pause</i>
      <i v-else class="material-icons audio-player__toggle__icon">play_arrow</i>
    </div>
    <div class="audio-player__controls">
      <div class="audio-player__controls__title" v-html="title" />
      <div class="audio-player__controls__timecode">
        <span v-html="formatTime(seek)"></span> /
        <span v-html="formatTime(duration)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import VueHowler from 'vue-howler'

export default {
  mixins: [VueHowler],
  mounted() {
    this.$nextTick(() => {
      this.timelineElement = document.getElementById('timeline')
    })
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
    scrub(e) {
      const progress =
        (e.pageX - this.timelineElement.closest('.atom').offsetLeft) /
        this.timelineElement.offsetWidth
      this.setProgress(progress)
      this.play()
    },
  },
  props: {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";
@mixin progress-bar {
  background-color: transparent;
}

@mixin progress-value {
  background-color: $red;
}

.audio-player {
  height: 400px;
  width: 400px;
  overflow: hidden;

  @include screen-size("small") {
    width: 80vw;
    height: 300px;
  }

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
</style>
