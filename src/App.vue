<template>
  <div class='app'>
    <navbar/>
    <router-view id='main-view' />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import navbar from '@/components/navbar/navbar'
import {format} from 'date-fns'

export default {
  name: 'app',
  data() {
    return {
      meta: {
        sitename: 'NNN.FREEPORT.GLOBAL',
        facebook: 'xxxxxxxxx',
        twitter: '@xxxxx',
        title: 'NNN.FREEPORT.GLOBAL',
        description:
          'nnn.freeport.global is an alternative space for the distribution of artworks, using the backstreets, black markets and divergent parts of the internet to create, exhibit and debate the value of art.',
        type: 'website',
        image: 'http://nnn.freeport.global/static/nnnfreeport.jpg',
        url: 'https:///nnn.freeport.global',
        defaults: {
          title: 'NNN.FREEPORT.GLOBAL',
          description:
            'nnn.freeport.global is an alternative space for the distribution of artworks, using the backstreets, black markets and divergent parts of the internet to create, exhibit and debate the value of art.',
          image: 'http://nnn.freeport.global/static/nnnfreeport.jpg',
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
  sockets: {
    enter(data) {
      this.UPDATE_USERLIST(data.list)
      this.WRITE_LOG({
        time: format(new Date(), 'HH:mm:ss'),
        text:
          data.user.id +
          ' (' +
          this.formatLocation(data.user.geo.city, data.user.geo.country) +
          ') joined',
        type: 'positive'
      })
    },
    leave(data) {
      this.UPDATE_USERLIST(data.list)
      this.WRITE_LOG({
        time: format(new Date(), 'HH:mm:ss'),
        text: data.user.id + ' left',
        type: 'negative'
      })
    },
    view(data) {
      this.WRITE_LOG({
        time: format(new Date(), 'HH:mm:ss'),
        text: data.id + ' opened <strong>' + data.title + '</strong>',
        hash: data.hash,
        type: 'activity'
      })
    },
    chat(data) {
      console.log('chat received')
      console.log(data)
    }
  },
  mounted() {
    this.WRITE_LOG({
      time: format(new Date(), 'HH:mm:ss'),
      text: 'Ethereum Contract address: 0x737A4FA0eDBcc8c29d74cd2cebA315314E2C608A',
      type: 'network'
    })
    // Check for mobile here. To be improved!
    if (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    ) {
      this.$router.push({name: 'scan'})
    }
    this.$_setMetaTags()
    this.$_fetchData()
  },
  methods: {
    ...mapActions(['GET_CONTAINER', 'UPDATE_USERLIST', 'WRITE_LOG']),
    $_setMetaTags(meta = {}) {
      this.meta.title = meta.title || this.meta.defaults.title
      this.meta.description = meta.description || this.meta.defaults.description
      this.meta.image = meta.image || this.meta.defaults.image
      this.meta.type = meta.type || this.meta.defaults.type
      this.meta.url = meta.url || 'https://nnn.freeport.global'
      this.$emit('updateHead')
    },
    $_fetchData(routeName) {
      this.GET_CONTAINER()
    },
    formatLocation(city, country) {
      if (city) {
        return city + ', ' + country
      } else {
        return country
      }
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
          content: 'NNN.FREEPORT.GLOBAL'
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
        // Google+ / Schema.org
        {itemprop: 'name', content: this.meta.title},
        {
          itemprop: 'description',
          content: this.meta.description
        },
        {itemprop: 'image', content: this.meta.image}
      ]
    }
  },
  watch: {
    'main.currentWork'() {
      const meta = {
        title: this.main.currentWork.title,
        description: this.main.currentWork.description,
        url: 'https://nnn.freeport.global/tracking/' + this.main.currentWork.id
      }
      this.$_setMetaTags(meta)
    },
    'main.rootHash'() {
      this.WRITE_LOG({
        time: format(new Date(), 'HH:mm:ss'),
        text: 'IPFS root hash: ' + this.main.rootHash,
        type: 'network'
      })
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_responsive.scss';
@import './style/_variables.scss';
@import url('https://fonts.googleapis.com/css?family=Space+Mono:400,400i,700,700i');

html,
body {
  margin: 0;
  overflow: hidden;
  background-color: $black;
  @include hide-scroll;
}

.app {
  font-family: 'space mono', $sans-serif-stack;
  font-size: $font-size-medium;
  @include screen-size('small') {
    font-size: $font-size-small;
    line-height: $line-height-small;
  }
  line-height: $line-height-medium;
  color: $black;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
}

#main-view {
  width: 100vw;
  height: 100vh;
  @include hide-scroll;

  @include screen-size('small') {
    overflow-y: scroll;
  }
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

.mapboxgl-control-container {
  display: none !important;
  opacity: 0;
}

.marker {
  background-image: url('assets/img/ic_clear_black_24px.svg');
  background-size: cover;
  cursor: normal;
  width: 30px;
  height: 30px;
}

.exhibition-marker {
  background-image: url('assets/img/ic_gps_not_fixed_black_24px.svg');
  background-size: cover;
  cursor: normal;
  width: 25px;
  height: 25px;
}

h1,
h2,
h3 {
  font-size: $font-size-medium;
}

table {
  border-collapse: collapse;
  padding: 0;
}

a {
  color: $white;
  text-decoration: none;
}

em {
  font-weight: bold !important;
  font-style: normal !important;
}

p {
  a {
    border-bottom: 2px solid $green !important;
    &:hover {
      border-bottom: 2px solid $white !important;
    }
  }
}

.tooltip {
  display: block !important;
  z-index: 10000;
  font-family: 'space mono', $sans-serif-stack;
  font-size: $font-size-small;
  font-weight: normal !important;

  @include screen-size('small') {
    display: none !important;
  }

  .tooltip-inner {
    background: white;
    color: $black;
    padding: 10px;
    font-weight: normal !important;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 7px;
    border-color: $white;
    display: none;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -7px;
      left: calc(50% - 7px);
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
    margin-right: 7px;

    .tooltip-arrow {
      border-width: 7px 0 7px 7px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -7px;
      top: calc(50% - 7px);
      margin-left: 0;
      margin-right: 0;
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
