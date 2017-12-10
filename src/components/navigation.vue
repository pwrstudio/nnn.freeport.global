<template>
  <div id='navigation'
       :class='{active: active}'>
    <router-link to='/'>
      <span>Stack</span>
    </router-link>
    <router-link to='/status'>
      <span>Status</span>
    </router-link>
    <router-link to='/info'>
      <span>Info</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'navigation',
  props: {
    active: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

#navigation {
  padding-top: 200px;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 1);
  color: white;
  transform: translateY(-105%);
  will-change: transform;
  transition: opacity 0.25s cubic-bezier(0.165, 0.84, 0.44, 1),
    transform 20s cubic-bezier(0.165, 0.84, 0.44, 1);
  opacity: 0;
  z-index: 15;

  &.active {
    transition: opacity 0.15s cubic-bezier(0.165, 0.84, 0.44, 1),
      transform 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
    transform: translateY(0);
    opacity: 1;
  }

  a {
    font-size: 10vw;
    width: auto;
    display: block;
    margin-right: auto;
    margin-left: auto;
    height: 11vw;
    text-align: center;
    user-select: none;
    cursor: pointer;
    color: white !important;
    text-decoration: none;

    &:hover {
      span {
        text-decoration: underline;
      }

      .char {
        color: white !important;
      }
    }
  }
}
</style>
