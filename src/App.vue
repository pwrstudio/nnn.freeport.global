<template>
  <div class='app'>
    <notifications group="global"
                   classes="global-notifications"
                   width="500px" />
    <div id='nav-left'
         v-tooltip="'info'"
         :class='{active: $route.name === "info"}'>
      <router-link :to='$route.name === "info" || $route.name === "status" ? "/" : "/info"'
                   class='sidebar-pattern'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </router-link>
    </div>
    <transition name="fade">
      <router-view id='main-view' />
    </transition>
    <div id='nav-right'
         v-tooltip="'status'"
         :class='{active: $route.name === "status"}'>
      <router-link to='/status'
                   class='sidebar-pattern'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import logo from '@/components/logo'

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
      socket: {
        userList: []
      }
    }
  },
  computed: {
    ...mapState(['main'])
  },
  components: {
    logo
  },
  watch: {
    $route(to, from) {},
    'main.rootHash'() {
      this.$notify({
        group: 'global',
        type: 'network',
        title: 'Connected to IPFS',
        text: 'IPFS root hash: ' + this.main.rootHash
      })
    }
  },
  sockets: {
    list(data) {
      // this.socket.userList = data.reverse()
      this.$notify({
        group: 'global',
        type: 'user',
        title: 'User joined',
        text: data
      })
    }
  },
  mounted() {
    this.$notify({
      group: 'global',
      type: 'network',
      title: 'Connecting to Ethereum: Rinkeby',
      text: 'Contract address: 0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A'
    })
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

html {
  margin: 0;
  overflow-x: hidden;
  background-color: #333333;

  @include hide-scroll;
}

body {
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
  min-height: 100vh;
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.fade-enter,
.fade-leave-to {
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
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
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  will-change: transform;
  transform: translateX(calc(-100vw + 40px));
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  &.active {
    transform: translateX(0);
  }
  .sidebar-pattern {
    display: block;
    z-index: 10000000;
    width: 40px;
    height: 100vh;
    opacity: 1;
    position: absolute;
    top: 0;
    right: 0;
    div {
      height: 4vh;
      width: 100%;
      &:nth-child(even) {
        background: transparent;
      }
      &:nth-child(odd) {
        background: #777777;
      }
    }
  }
}

#nav-right {
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  // background: black;
  will-change: transform;
  transform: translateX(calc(100vw - 40px));
  transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  &.active {
    transform: translateX(0);
  }
  .sidebar-pattern {
    display: block;
    z-index: 10000000;
    width: 40px;
    height: 100vh;
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    div {
      height: 4vh;
      width: 100%;
      &:nth-child(even) {
        background: #555555;
      }
      &:nth-child(odd) {
        background: transparent;
      }
    }
  }
}

.global-notifications {
  background: orangered;
  margin: 10px;
  padding: 10px;
  width: auto;
  font-size: 18px;
  line-height: 18px;

  .notification-title {
    font-size: 14px;
    line-height: 14px;
  }

  .notification-content {
    font-size: 18px;
    line-height: 18px;
  }

  &.network {
    background: orangered;
    /*
    Style for specific type of notification, will be applied when you
    call notification with "type" parameter:
    this.$notify({ type: 'my-type', message: 'Foo' })
    */
  }
  &.user {
    background: black;
    border: 5px solid white;
    color: white;
    /*
    Style for specific type of notification, will be applied when you
    call notification with "type" parameter:
    this.$notify({ type: 'my-type', message: 'Foo' })
    */
  }
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
