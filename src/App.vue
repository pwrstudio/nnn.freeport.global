<template>
  <div class='app'>
    <!-- <console /> -->
    <!-- <logo @click.native='navigation.active = !navigation.active' /> -->
    <navigation :active='navigation.active' />
    <!-- <transition name="fade"> -->
    <router-view id='main-view' />
    <!-- </transition> -->
    <div id='nav-right'></div>
    <div id='nav-left'></div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import logo from '@/components/logo'
import navigation from '@/components/navigation'
import console from '@/components/console'

export default {
  name: 'app',
  data() {
    return {
      meta: {
        sitename: 'NNN.FREEPORT.GLOBAL',
        facebook: 'xxxxxxxxx',
        twitter: '@xxxxx',
        title: 'NNN.FREEPORT.GLOBAL',
        description: 'xxxx',
        type: 'website',
        image: 'https:///nnn.freeport.global',
        url: 'https:///nnn.freeport.global',
        defaults: {
          title: 'NNN.FREEPORT.GLOBAL',
          description: 'xxxx',
          image: 'http://nnn.freeport.global',
          type: 'website'
        }
      },
      navigation: {
        active: false
      }
    }
  },
  computed: {
    ...mapState(['main'])
  },
  components: {
    logo,
    navigation,
    console
  },
  watch: {
    $route(to, from) {
      this.navigation.active = false
    }
  },
  mounted() {
    this.$_setMetaTags()
    this.$_fetchData()
  },
  methods: {
    ...mapActions(['GET_CONTAINER']),
    $_setMetaTags(meta = {}) {
      this.meta.title = meta.title || this.meta.defaults.title
      this.meta.description = meta.description || this.meta.defaults.description
      this.meta.image = meta.image || this.meta.defaults.image
      this.meta.type = meta.type || this.meta.defaults.type
      this.meta.url = 'http://xxx.com' + this.$route.fullPath
      this.$emit('updateHead')
    },
    $_fetchData(routeName) {
      this.GET_CONTAINER()
      // All requests for data from the server originates from this function
      // if (routeName === 'home') {
      //   this.GET_CONTAINER()
      // }
    }
  },
  head: {
    title() {
      return {
        inner: this.meta.title
      }
    },
    meta() {
      return [
        {
          name: 'application-name',
          content: 'Beirut Art Center'
        },
        {
          name: 'description',
          content: this.meta.description
        },
        // Twitter
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: this.meta.title},
        {
          name: 'twitter:description',
          content: this.meta.description
        },
        {name: 'twitter:site', content: this.meta.twitter},
        {
          name: 'twitter:creator',
          content: this.meta.twitter
        },
        {
          name: 'twitter:image:src',
          content: this.meta.image
        },
        // Facebook / Open Graph
        {property: 'og:title', content: this.meta.title},
        {
          property: 'og:site_name',
          content: this.meta.defaults.title
        },
        {
          property: 'og:description',
          content: this.meta.description
        },
        {property: 'og:type', content: this.meta.type},
        {property: 'og:url', content: this.meta.url},
        {property: 'og:image', content: this.meta.image},
        // {property: 'fb:admins', content: this.meta.facebook},
        // {property: 'fb:app_id', content: this.meta.facebook},
        // Google+ / Schema.org
        {itemprop: 'name', content: this.meta.title},
        {
          itemprop: 'description',
          content: this.meta.description
        },
        {itemprop: 'image', content: this.meta.image}
      ]
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_responsive.scss';
@import './style/_variables.scss';
@import url('https://fonts.googleapis.com/css?family=Space+Mono');

body,
html {
  margin: 0;
  overflow-x: hidden;
  background-color: $black;

  @include hide-scroll;
}

.app {
  font-family: 'space mono', $sans-serif-stack;
  font-size: $font-size;
  line-height: $line-height;
  color: $black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

#main-view {
  width: calc(100vw - 100px);
  margin-right: auto;
  margin-left: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
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

#nav-left {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50px;
  background: darksgrey;
}

#nav-right {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 50px;
  background: darkgrey;
}
</style>
