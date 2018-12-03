<template>
  <div class='not-found'>
    <router-link to='/'>404</router-link>
  </div>
</template>

<script>
export default {
  name: 'notFound',
}
</script>

<style scoped lang="scss">
@import "../style/helpers/_mixins.scss";
@import "../style/helpers/_responsive.scss";
@import "../style/_variables.scss";
@import '../style/vendor/swiper.css';

.not-found {
  position: fixed;
  top: 0px;
  left: 0;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  @include hide-scroll;
  background: $red;

  a {
    font-size: 10vw;
    @include center;
    &:hover {
      color: $black;
    }
  }
}
</style>
