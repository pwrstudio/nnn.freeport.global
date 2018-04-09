<template>
  <div>

    <div class='work'
         :class='{"work--show": loaded}'>
      <div class='work__inner'
           @scroll='updateScroll'>
        <contentAtom v-for='item in payload.content'
                     :key='item.hash'
                     :hash='item.hash' />
      </div>
    </div>

    <!-- Single content overlay -->
    <singleContentOverlay v-if='$route.name === "singleContent"' />

    <!-- Roll-down info overlay -->
    <div v-if='$route.params.info'
         class='info-overlay'>
      <div class='info-overlay__hash'>
        <span class='info-overlay__hash__label'
              v-html='"hash"' />
        <span v-html='$route.params.hash' />
      </div>

      <div class='info-overlay__title'>
        <span class='info-overlay__title__label'
              v-html='"title"' />
        <span v-html='payload.title' />
      </div>

      <div class='info-overlay__artist'>
        <span class='info-overlay__artist__label'
              v-html='"artist"' />
        <span v-html='artistList' />
      </div>

      <router-link :to='"/&/" + exhibition.hash'
                   class='info-overlay__exhibition'>
        <span class='info-overlay__exhibition__label'
              v-html='"exhibition"' />
        <span v-html='exhibition.title' />
      </router-link>

      <div class='info-overlay__location'>
        <span class='info-overlay__title__label'
              v-html='"festival"' />
        <span>{{exhibition.festival}}</span>
      </div>

      <div class='info-overlay__location'>
        <span class='info-overlay__title__label'
              v-html='"location"' />
        <span>{{exhibition.location.venue}}, {{exhibition.location.city}}, {{exhibition.location.country}}</span>
      </div>

      <div v-if='payload.description'
           class='info-overlay__description'
           v-html='payload.description' />

    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import contentAtom from '@/components/content-atom/content-atom'
import singleContentOverlay from '@/components/single-content-overlay'

export default {
  name: 'singleWork',
  components: {
    contentAtom,
    singleContentOverlay
  },
  data() {
    return {
      loaded: false,
      exhibition: {
        hash: '',
        title: ''
      },
      payload: {
        artists: [],
        content: [],

        data: '',
        id: '',
        title: ''
      }
    }
  },
  mounted() {
    const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.$route.params.hash)
    httpPromise.then(response => {
      this.payload = response.body
      this.SET_CURRENT_WORK(this.payload)
      this.$socket.emit('view', {title: this.payload.title, hash: this.$route.params.hash})
      this.getExhibition()
      this.loaded = true
    })
    httpPromise.catch(e => {
      this.$router.push({name: 'notFound'})
    })
  },
  computed: {
    ...mapState(['main']),
    artistList() {
      if (this.payload.artists.length > 0) {
        return this.payload.artists.reduce(
          (accumulator, currentValue) => accumulator + ', ' + currentValue
        )
      }
    }
  },
  methods: {
    ...mapActions(['SET_CURRENT_WORK']),
    updateScroll(event) {
      console.log(event)
    },
    getExhibition() {
      this.main.exhibitions.forEach(e => {
        console.log(e.works)
        e.works.find(w => {
          if (w.hash === this.$route.params.hash) {
            console.log('found')
            console.log(e)
            this.exhibition = e
          }
        })
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

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
    width: auto;
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $black;
  padding: 30px;
  padding-top: 80px;
  overflow-y: auto;

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
