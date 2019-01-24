<template>
  <div>
    <geoCinema v-if="payload.id === 'Wm86XyQAAKtZ6qPN'"/>

    <template v-else>
      
      <div class="work" :class="{'work--show': loaded}">

        <!-- Output all connected content items -->
        <div class="work__inner">
          <slideShow v-for="item in payload.slideshow" :key="item.id" :slides='item'/>
          <contentAtom v-for="item in payload.content" :key="item.hash" :hash="item.hash"/>
        </div>
      </div>

      <!-- Single content overlay -->
      <singleContentOverlay v-if="$route.name === 'singleContent'"/>
      <slideShowOverlay v-if="$route.name === 'slideShow'"/>

    </template>

    <!-- Roll-down info overlay -->
    <div v-if="$route.params.info" class="info-overlay">

      <div class='info-overlay-left'>
        <!-- Hash -->
        <div class="info-overlay__hash">
          <span class="info-overlay__hash__label" v-html="'hash'"/>
          <span v-html="$route.params.hash"/>
        </div>

        <!-- Title -->
        <div class="info-overlay__title">
          <span class="info-overlay__title__label" v-html="'title'"/>
          <span v-html="payload.title"/>
        </div>

        <!-- Artist -->
        <div class="info-overlay__artist">
          <span class="info-overlay__artist__label" v-html="'artist'"/>
          <span v-html="artistList"/>
        </div>

        <!-- Exhibition -->
        <router-link v-if='exhibition.title' :to="'/&/' + exhibition.hash" class="info-overlay__exhibition">
          <span class="info-overlay__exhibition__label" v-html="'exhibition'"/>
          <span v-html="exhibition.title"/>
        </router-link>

        <!-- Festival -->
        <div v-if='exhibition.festival' class="info-overlay__location">
          <span class="info-overlay__title__label" v-html="'festival'"/>
          <span>{{exhibition.festival}}</span>
        </div>

        <!-- Location -->
        <div v-if='exhibition.location.venue' class="info-overlay__location">
          <span class="info-overlay__title__label" v-html="'location'"/>
          <span>
            <span v-if="exhibition.location.venue">{{exhibition.location.venue}},</span>
            <span v-if="exhibition.location.city">{{exhibition.location.city}},</span>
            <span v-if="exhibition.location.country">{{exhibition.location.country}}</span>
          </span>
        </div>
      </div>

      <!-- QR code -->
      <div class="info-overlay__qr">
        <canvas id='qr-code'></canvas>
      </div>

      <!-- Description -->
      <div
        v-if="payload.description"
        class="info-overlay__description"
        v-html="payload.description"/>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import contentAtom from '@/components/content-atom/content-atom'
import slideShow from '@/components/content-atom/slide-show'
import singleContentOverlay from '@/components/single-content-overlay'
import slideShowOverlay from '@/components/slide-show-overlay'
import geoCinema from '@/components/special/geocinema'
import QRCode from 'qrcode'
import { isPast } from 'date-fns'

export default {
  name: 'singleWork',
  components: {
    contentAtom,
    singleContentOverlay,
    slideShowOverlay,
    slideShow,
    geoCinema,
  },
  data() {
    return {
      loaded: false,
      exhibition: {
        hash: '',
        title: '',
        festival: '',
        location: {
          venue: '',
          city: '',
          country: '',
        },
      },
      payload: {
        artists: [],
        content: [],
        data: '',
        id: '',
        title: '',
      },
    }
  },
  mounted() {
    // Get the content from IPFS
    const httpPromise = this.$http.get(
      'https://cloudflare-ipfs.com/ipfs/' + this.$route.params.hash,
    )
    httpPromise.then(response => {
      // Check if the work is live...
      // if (isPast(response.body.date)) {
      if (1) {
        // Get slideshows...
        response.body.slideshow = []
        response.body.content.forEach(c => {
          let dups = response.body.content.filter(x => x.id === c.id)
          if (dups.length > 1) {
            let temparray = []
            temparray.push(dups)
            response.body.slideshow.push(temparray)
            response.body.content = response.body.content.filter(
              y => y.id !== c.id,
            )
          }
        })
        this.payload = response.body
        this.loaded = true
        this.SET_CURRENT_WORK(this.payload)
        this.$socket.emit('view', {
          title: this.payload.title,
          hash: this.$route.params.hash,
        })
        this.getExhibition()
      } else {
        this.$router.push({ name: 'refuse' })
      }
    })
    httpPromise.catch(e => {
      this.$router.push({ name: 'notFound' })
    })
  },
  computed: {
    ...mapState(['main']),
    artistList() {
      // Output multiple artists nicely...
      if (this.payload.artists.length > 0) {
        return this.payload.artists.reduce(
          (accumulator, currentValue) => accumulator + ', ' + currentValue,
        )
      }
    },
  },
  methods: {
    ...mapActions(['SET_CURRENT_WORK']),
    getExhibition() {
      this.main.exhibitions.forEach(e => {
        e.works.find(w => {
          if (w.hash === this.$route.params.hash) {
            this.exhibition = e
          }
        })
      })
    },
  },
  watch: {
    '$route.params'() {
      if (this.$route.params.info) {
        window.setTimeout(() => {
          QRCode.toCanvas(document.getElementById('qr-code'), this.payload.id, {
            width: 1200,
          })
          // QRCode.toString(this.payload.id, function(err, string) {
          //   if (err) throw err
          //   console.log(string)
          // })
        }, 500)
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "../style/helpers/_mixins.scss";
@import "../style/helpers/_responsive.scss";
@import "../style/_variables.scss";

@mixin box {
  border: 1px solid $white;
  color: $white;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 20px;
  width: calc(100% - 100px);
}

@mixin label {
  display: inline-block;
  font-size: $font-size-small;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 12ch;

  @include screen-size('medium') {
    font-size: 12px;
    width: 15%;
  }

}

.work {
  @include hide-scroll;

  height: 100vh;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 60px;
  position: fixed;
  top: 0;
  width: 100vw;
  display: none;

  &--show {
    display: block;
  }

  &__inner {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 200px;
  }
}

.info-overlay {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $black;
  flex-wrap: wrap;
  padding: 30px;
  padding-top: 80px;
  overflow-y: auto;
  z-index: 2;

   &-left {
     width: 70%;

    @include screen-size('medium') {
      width: 100%;
    }
   }

  &__hash {
    @include box;

    white-space: nowrap;
    text-overflow: ellipsis;

    &__label {
      @include label;
    }
  }

  &__title {
    @include box;

    &__label {
      @include label;
    }
  }

  &__artist {
    @include box;

    &__label {
      @include label;
    }
  }

  &__exhibition {
    @include box;
    display: block;
    cursor: pointer;

    &:hover {
      background: $white;
      color: $black;
    }

    &__label {
      @include label;
    }
  }

  &__qr {
    @include box;
    width: calc(30% - 100px);
    height: auto;
    display: block;
    display: flex;
    justify-content: center;
    align-items: center;

    @include screen-size('medium') {
      display: none;
    }

    canvas {
      width: 200px !important;
      height: 200px !important;
    }
    
    &__label {
      @include label;
    }
  }

  &__location {
    @include box;

    &__label {
      @include label;
    }
  }

  &__description {
    @include box;

    &__label {
      @include label;
    }
    margin-bottom: 180px;
  }
}
</style>
