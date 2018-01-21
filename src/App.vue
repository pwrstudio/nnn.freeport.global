<template>
  <div class='app'>
    <navbar/>
    <notifications group="global"
                   classes="global-notifications"
                   width="400px" />
    <router-view id='main-view' />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import navbar from '@/components/navbar'

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
      }
    }
  },
  computed: {
    ...mapState(['main'])
  },
  components: {
    navbar
  },
  watch: {
    $route(to, from) {},
    'main.rootHash'() {
      this.$notify({
        group: 'global',
        type: 'network',
        duration: 1000,
        position: 'bottom right',
        title: 'Connected to IPFS',
        text: 'IPFS root hash: ' + this.main.rootHash
      })
    }
  },
  sockets: {
    enter(data) {
      this.UPDATE_USERLIST(data.list)
      this.$notify({
        group: 'global',
        type: 'positive',
        position: 'bottom right',
        title: data.user.id + ' (' + data.user.geo.city + ', ' + data.user.geo.country + ') joined',
        text: ''
      })
    },
    leave(data) {
      console.log(data)
      this.UPDATE_USERLIST(data.list)
      this.$notify({
        group: 'global',
        type: 'negative',
        position: 'bottom right',
        title: data.user.id + ' left',
        text: ''
      })
    },
    view(data) {
      this.$notify({
        group: 'global',
        position: 'bottom right',
        type: 'user',
        title: 'view',
        text: 'xxx'
      })
    }
  },
  mounted() {
    this.$notify({
      group: 'global',
      type: 'network',
      duration: 1000,
      position: 'bottom right',
      title: 'Connecting to Ethereum: Rinkeby',
      text: 'Contract address: 0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A'
    })
    this.$_setMetaTags()
    this.$_fetchData()
  },
  methods: {
    ...mapActions(['GET_CONTAINER', 'UPDATE_USERLIST']),
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
@import './style/fonts/PanamaDemo-Monospace/styles.css';
@import './style/fonts/FiveYearsLaterDemo/styles.css';
@import url('https://fonts.googleapis.com/css?family=Space+Mono');

html,
body {
  margin: 0;
  overflow: hidden;
  background-color: $black;
  @include hide-scroll;
}

.app {
  // font-family: 'FiveYearsLaterDemo', 'space mono', $sans-serif-stack;
  font-family: 'space mono', $sans-serif-stack;
  font-size: $font-size;
  @include screen-size('small') {
    font-size: 16px;
    line-height: 16px;
  }
  line-height: $line-height;
  color: $black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

#main-view {
  width: 100vw;
  height: 100vh;
}

.nav-button {
  @include nav;
  background: transparent;
  top: 0;
  z-index: 1000;
  &__left {
    left: 0;
  }
  &__right {
    right: 0;
  }
}

.material-icons {
  font-size: 48px;
  line-height: 60px;
  @include screen-size('small') {
    font-size: 38px;
    line-height: 65px;
  }
}

.global-notifications {
  positio: fixed;
  left: 0;
  right: auto;
  background: $black;
  border: 1px solid $white;
  color: $white;
  margin: 10px;
  padding: 20px;
  width: auto;
  font-weight: normal !important;

  .notification-title {
    font-size: 14px;
    line-height: 14px;
  }

  .notification-content {
    font-size: 14px;
    line-height: 14px;
  }

  &.network {
    background: $black;
    border: 1px solid $white;
    color: $white;
  }
  &.positive {
    background: $green;
    border: 1px solid $white;
    color: $white;
  }
  &.negative {
    background: $red;
    border: 1px solid $white;
    color: $black;
  }
}

.mapboxgl-control-container {
  display: none !important;
  opacity: 0;
}

.marker {
  // background-image: url('assets/img/ic_place_black_24px.svg');
  background-image: url('assets/img/ic_clear_black_24px.svg');
  background-size: cover;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
</style>
