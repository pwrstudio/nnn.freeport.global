<script>
import VueHowler from 'vue-howler'

export default {
  mixins: [VueHowler]
}
</script>
 
<template>
  <div class='audio-player'>
    <progress class='audio-player__progress'
              max="1"
              :value="progress" />
    <div class='audio-player__toggle'
         @click="togglePlayback">
      <i v-if='playing'
         class="material-icons audio-player__toggle__icon">pause</i>
      <i v-else
         class="material-icons audio-player__toggle__icon">play_arrow</i>
    </div>
  </div>
</template>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

@mixin progress-bar {
  background-color: blue;
}
@mixin progress-value {
  background-color: yellow;
}

.audio-player {
  &__progress[value] {
    border: none;

    width: 100%;
    height: 60px;
    @include progress-bar;
  }
  &__toggle {
    cursor: pointer;

    &__icon {
      user-select: none;
      color: $white;
    }
  }
}

progress {
  @include progress-value;
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