<template>
  <div>
    <div class='exhibition'
         :class='{"exhibition--show": loaded}'>
      <div class='info-overlay__title'>
        <span class='info-overlay__title__label'
              v-html='"title"' />
        <span v-html='payload.title' />
      </div>
      <div class='info-overlay__title'>
        <span class='info-overlay__title__label'
              v-html='"Festival"' />
        <span v-html='payload.festival' />
      </div>
      <div class='info-overlay__title'>
        <span class='info-overlay__title__label'
              v-html='"Location"' />
        <span>{{payload.location.venue}}, {{payload.location.city}}, {{payload.location.country}}</span>
      </div>

      <div class='info-overlay__title'>
        <span class='info-overlay__title__label'
              v-html='"title"' />
        <span v-html='payload.start_date' /> –
        <span v-html='payload.end_date' />
      </div>
      <div v-if='payload.description'
           class='info-overlay__description'
           v-html='payload.description' />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import contentAtom from '@/components/content-atom/content-atom'

export default {
  name: 'exhibitionView',
  components: {
    contentAtom
  },
  data() {
    return {
      loaded: false,
      payload: {
        content: [],
        data: '',
        id: '',
        title: ''
      }
    }
  },
  mounted() {
    const httpPromise = this.$http.get(
      'https:/cloudflare-ipfs.com/ipfs/' + this.$route.params.exhibitionHash
    )
    httpPromise.then(response => {
      this.payload = response.body
      this.loaded = true
    })
    httpPromise.catch(e => {
      this.$router.push({ name: 'notFound' })
    })
  },
  computed: {},
  methods: {
    ...mapActions(['SET_CURRENT_exhibition']),
    updateScroll(event) {
      console.log(event)
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
  // width: calc(100% - 100px);
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

.exhibition {
  @include hide-scroll;

  height: 100vh;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  display: none;

  &--show {
    display: block;
  }

  max-width: 90vw;
  margin-left: auto;
  margin-right: auto;
  padding-top: 80px;

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
