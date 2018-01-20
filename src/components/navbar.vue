<template>
  <div class='navbar'>

    <!-- INFO -->
    <!-- INFO -->
    <!-- INFO -->
    <template v-if='$route.name === "info"'>
      <router-link class='nav-button nav-button__left'
                   to='/'>
        nnn.freeport.global
      </router-link>
      <router-link class='nav-button nav-button__right'
                   to='/'>
        <i class="material-icons">trending_up</i>
      </router-link>
    </template>
    <!-- END: INFO -->

    <!-- STATUS -->
    <!-- STATUS -->
    <!-- STATUS -->
    <template v-if='$route.name === "status"'>
      <router-link class='nav-button nav-button__left'
                   to='/info'>
        nnn.freeport.global
      </router-link>
      <router-link v-if='main.currentSlide'
                   class='nav-button nav-button__right'
                   :to='{name: "stack", params: {unit: main.currentSlide}}'>
        <i class="material-icons">menu</i>
      </router-link>
      <router-link v-else
                   class='nav-button nav-button__right'
                   :to='{name: "stack"}'>
        <i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: STATUS -->

    <!-- STACK -->
    <!-- STACK -->
    <!-- STACK -->
    <template v-if='$route.name === "stack"'>
      <router-link class='nav-button nav-button__left'
                   to='/info'>
        nnn.freeport.global
      </router-link>
      <router-link class='nav-button nav-button__right'
                   to='/'>
        <i class="material-icons">trending_up</i>
      </router-link>
    </template>
    <!-- END: STACK -->

    <!-- SCAN -->
    <!-- SCAN -->
    <!-- SCAN -->
    <template v-if='$route.name === "scan"'>
      <router-link class='nav-button nav-button__left'
                   to='/info'>
        nnn.freeport.global
      </router-link>
      <router-link v-if='main.currentSlide'
                   class='nav-button nav-button__right'
                   :to='{name: "stack", params: {unit: main.currentSlide}}'>
        <i class="material-icons">menu</i>
      </router-link>
      <router-link v-else
                   class='nav-button nav-button__right'
                   :to='{name: "stack"}'>
        <i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: SCAN-->

    <!-- SINGLE WORK-->
    <!-- SINGLE WORK-->
    <!-- SINGLE WORK-->
    <template v-if='$route.name === "singleWork" && !$route.params.info'>
      <router-link :to='{name: "singleWork", params: {hash: $route.params.hash, info: "info"}}'
                   class='nav-button nav-button__left'>
        {{main.currentWork.title}}
      </router-link>
      <router-link v-if='main.currentSlide'
                   class='nav-button nav-button__right'
                   :to='{name: "stack", params: {unit: main.currentSlide}}'>
        <i class="material-icons">menu</i>
      </router-link>
      <router-link v-else
                   class='nav-button nav-button__right'
                   :to='{name: "stack"}'>
        <i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: SINGLE WORK-->

    <!-- SINGLE WORK: INFO-->
    <!-- SINGLE WORK: INFO-->
    <!-- SINGLE WORK: INFO-->
    <template v-if='$route.name === "singleWork" && $route.params.info'>

      <router-link :to='{name: "singleWork", params: {hash: $route.params.hash}}'
                   class='nav-button nav-button__left'>
        {{main.currentWork.title}}
      </router-link>

      <router-link class='nav-button nav-button__right'
                   :to='{name: "singleWork", params: {hash: $route.params.hash}}'>
        <i class="material-icons">close</i>
      </router-link>

    </template>
    <!-- END: SINGLE WORK: INFO-->

    <!-- SINGLE CONTENT -->
    <!-- SINGLE CONTENT -->
    <!-- SINGLE CONTENT -->
    <template v-if='$route.name === "singleContent" && !$route.params.info'>
      <div @click='$router.go(-1)'
           class='nav-button nav-button__left'>
        {{main.currentWork.title}}
      </div>
      <div class='nav-button nav-button__right'
           @click='$router.go(-1)'>
        <i class="material-icons">arrow_back</i>
      </div>
    </template>
    <!-- END: SINGLE CONTENT -->

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapState(['main'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.nav-button__left {
  @include screen-size('small') {
    width: 70vw;
    background: $black;
  }
}

.nav-button__right {
  @include screen-size('small') {
    width: 30vw;
    background: $black;
  }
}
</style>
