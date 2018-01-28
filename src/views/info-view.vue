<template>
  <div class='info'>
    <div class='info__inner'>
      <!-- Main -->
      <div class='info__inner__main'>
        <span class='info__inner__main__text'
              v-html='main.container.about.info' />
        <div>- - - - - - - - -</div>
        <span class="info__inner__tech__text"
              v-html='main.container.about.tech' />
      </div>
      <!-- Sidebar -->
      <div class='info__inner__sidebar'>
        <div class='info__inner__sidebar__divider'>- - - - - - - - -</div>
        <span class='info__inner__sidebar__text'
              v-html='main.container.about.credits' />
      </div>
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

.info {
  color: $white;
  padding-top: 80px;
  // height: calc(100vh - 80px);
  overflow-y: auto;

  &__inner {
    margin-bottom: 200px;

    &__main {
      width: calc(70vw - 80px);
      float: left;
      padding-left: 40px;
      padding-right: 40px;
      font-size: $font-size-medium;
      line-height: $line-height-medium;
      margin-bottom: 200px;

      @include screen-size('small') {
        font-size: $font-size-small;
        line-height: $line-height-small;
        width: calc(100vw - 80px);
        margin-bottom: 0;
      }
    }

    &__sidebar {
      width: calc(30vw - 80px);
      float: left;
      padding-left: 40px;
      padding-right: 40px;
      font-size: $font-size-small;
      line-height: 24px;

      &__divider {
        display: none;
        @include screen-size('small') {
          display: block;
        }
      }

      @include screen-size('small') {
        width: calc(100vw - 80px);
        margin-bottom: 200px;
      }
    }
  }
}
</style>
