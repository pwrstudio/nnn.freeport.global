<template>
  <div class="navbar">
    <!-- INFO -->
    <!-- INFO -->
    <!-- INFO -->
    <template v-if="$route.name === 'info'">
      <router-link
        v-if="fromStatus"
        v-tooltip.auto="'Terminal'"
        class="nav-button nav-button__left nav-button--opaque"
        to="/">nnn.freeport.global</router-link>
      <router-link
        v-if="fromStack"
        v-tooltip.auto="'Stack'"
        class="nav-button nav-button__left nav-button--opaque"
        :to="{name: 'stack', params: {unit: main.currentSlide}}">nnn.freeport.global</router-link>
      <router-link
        v-if="fromStatus"
        v-tooltip.auto="'Terminal'"
        class="nav-button nav-button__right nav-button--opaque"
        to="/"><i class="material-icons">trending_up</i>
      </router-link>
      <router-link
        v-if="fromStack"
        v-tooltip.auto="'Stack'"
        class="nav-button nav-button__right nav-button--opaque"
        :to="{name: 'stack', params: {unit: main.currentSlide}}"><i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: INFO -->
    <!-- STATUS -->
    <!-- STATUS -->
    <!-- STATUS -->
    <template v-if="$route.name === 'status'">
      <router-link
        class="nav-button nav-button__left"
        v-tooltip.auto="'About the platform'"
        to="/info">nnn.freeport.global</router-link>
      <router-link
        v-if="main.currentSlide"
        class="nav-button nav-button__right"
        v-tooltip.auto="'Stack'"
        :to="{name: 'stack', params: {unit: main.currentSlide}}"><i class="material-icons">menu</i>
      </router-link>
      <router-link
        v-else
        class="nav-button nav-button__right"
        v-tooltip.auto="'Stack'"
        :to="{name: 'stack'}"><i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: STATUS -->
    <!-- EXHIBITION -->
    <!-- EXHIBITION -->
    <!-- EXHIBITION -->
    <template v-if="$route.name === 'exhibitionView'">
      <router-link
        class="nav-button nav-button--opaque nav-button__left"
        v-tooltip.auto="'About the platform'"
        to="/info">nnn.freeport.global</router-link>
      <router-link
        v-if="main.currentSlide"
        class="nav-button nav-button--opaque nav-button__right"
        v-tooltip.auto="'Stack'"
        :to="{name: 'stack', params: {unit: main.currentSlide}}"><i class="material-icons">menu</i>
      </router-link>
      <router-link
        v-else
        class="nav-button nav-button--opaque nav-button__right"
        v-tooltip.auto="'Stack'"
        :to="{name: 'stack'}"><i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: Exhibition-->
    <!-- STACK -->
    <!-- STACK -->
    <!-- STACK -->
    <template v-if="$route.name === 'stack'">
      <router-link
        class="nav-button nav-button__left"
        v-tooltip.auto="'About the platform'"
        to="/info"
      >nnn.freeport.global</router-link>
      <router-link class="nav-button nav-button__right" v-tooltip.auto="'Terminal'" to="/">
        <i class="material-icons">trending_up</i>
      </router-link>
    </template>
    <!-- END: STACK -->
    <!-- SCAN -->
    <!-- SCAN -->
    <!-- SCAN -->
    <template v-if="$route.name === 'scan'">
      <router-link class="nav-button nav-button__left" to="/info">nnn.freeport.global</router-link>
      <router-link
        v-if="main.currentSlide"
        class="nav-button nav-button__right"
        :to="{name: 'stack', params: {unit: main.currentSlide}}"
      >
        <i class="material-icons">menu</i>
      </router-link>
      <router-link v-else class="nav-button nav-button__right" :to="{name: 'stack'}">
        <i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: SCAN-->
    <!-- SINGLE WORK-->
    <!-- SINGLE WORK-->
    <!-- SINGLE WORK-->
    <template v-if="$route.name === 'singleWork' && !$route.params.info">
      <router-link
        :to="{name: 'singleWork', params: {hash: $route.params.hash, info: 'info'}}"
        v-tooltip.auto="'About work'"
        class="nav-button nav-button__left nav-button--opaque nav-button--hoverable"
      >{{main.currentWork.title}}</router-link>
      <router-link
        v-if="main.currentSlide"
        class="nav-button nav-button__right nav-button--opaque nav-button--hoverable"
        v-tooltip.auto="'Stack'"
        :to="{name: 'stack', params: {unit: main.currentSlide}}"
      >
        <i class="material-icons">menu</i>
      </router-link>
      <router-link
        v-else
        class="nav-button nav-button__right nav-button--opaque nav-button--hoverable"
        v-tooltip.auto="'Stack'"
        :to="{name: 'stack'}"
      >
        <i class="material-icons">menu</i>
      </router-link>
    </template>
    <!-- END: SINGLE WORK-->
    <!-- SINGLE WORK: INFO-->
    <!-- SINGLE WORK: INFO-->
    <!-- SINGLE WORK: INFO-->
    <template v-if="$route.name === 'singleWork' && $route.params.info">
      <router-link
        :to="{name: 'singleWork', params: {hash: $route.params.hash}}"
        class="nav-button nav-button__left nav-button--opaque nav-button--hoverable"
      >{{main.currentWork.title}}</router-link>

      <router-link
        class="nav-button nav-button__right nav-button--opaque nav-button--hoverable"
        :to="{name: 'singleWork', params: {hash: $route.params.hash}}"
      >
        <i class="material-icons">close</i>
      </router-link>
    </template>
    <!-- END: SINGLE WORK: INFO-->
    <!-- SINGLE CONTENT -->
    <!-- SINGLE CONTENT -->
    <!-- SINGLE CONTENT -->
    <template v-if="$route.name === 'singleContent' && !$route.params.info">
      <div
        @click="$router.go(-1)"
        class="nav-button nav-button__left nav-button--opaque nav-button--hoverable"
      >{{main.currentWork.title}}</div>
      <div
        class="nav-button nav-button__right nav-button--opaque nav-button--hoverable"
        @click="$router.go(-1)"
      >
        <i class="material-icons">arrow_back</i>
      </div>
    </template>
    <!-- END: SINGLE CONTENT -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'navbar',
  data() {
    return {
      fromStatus: false,
      fromStack: true,
    }
  },
  computed: {
    ...mapState(['main']),
  },
  watch: {
    $route(to, from) {
      if (from.name === 'status') {
        this.fromStatus = true
        this.fromStack = false
      } else {
        this.fromStatus = false
        this.fromStack = true
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";

.nav-button {
  overflow: hidden;

  &--opaque {
    background: $black;
  }

  &--hoverable {
    &:hover {
      background: $white;
      color: $black;
      cursor: pointer;
    }
  }
}

.nav-button__left {
  @include screen-size("small") {
    width: calc(70vw - 20px);
    background: $black;
    &:active {
      background: $white;
      color: $black;
    }
    &--opaque {
      background: $black;
    }
  }
}

.nav-button__right {
  @include screen-size("small") {
    width: calc(30vw - 20px);
    background: $black;
    &:active {
      background: $white;
      color: $black;
    }
  }
}

.material-icons {
  font-size: 48px;
  line-height: 60px;

  @include screen-size("small") {
    font-size: 38px;
    line-height: 65px;
  }
}
</style>
