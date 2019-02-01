<template>
  <div class="exhibition" :class="{ 'exhibition--show': loaded }">
    <!-- TITLE -->
    <div class="info-overlay__title">
      <span class="info-overlay__title__label" v-html="'title'" />
      <span v-html="payload.title" />
    </div>

    <!-- FESTIVAL-->
    <div class="info-overlay__title">
      <span class="info-overlay__title__label" v-html="'Festival'" />
      <span v-html="payload.festival" />
    </div>

    <!-- LOCATION -->
    <div class="info-overlay__title">
      <span class="info-overlay__title__label" v-html="'Location'" />
      <span
        >{{ payload.location.venue }}, {{ payload.location.city }},
        {{ payload.location.country }}</span
      >
    </div>

    <!-- DATES -->
    <div class="info-overlay__title">
      <span class="info-overlay__title__label" v-html="'title'" />
      <span v-html="payload.start_date" /> –
      <span v-html="payload.end_date" />
    </div>

    <!-- DESCRIPTION -->
    <div
      v-if="payload.description"
      class="info-overlay__description"
      v-html="payload.description"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'exhibitionView',
  data() {
    return {
      loaded: false,
      payload: {
        content: [],
        data: '',
        id: '',
        title: '',
      },
    }
  },
  mounted() {
    const httpPromise = this.$http.get(
      'https://cloudflare-ipfs.com/ipfs/' + this.$route.params.exhibitionHash,
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
  },
}
</script>

<style scoped lang="scss">
@import "../style/helpers/_mixins.scss";
@import "../style/helpers/_responsive.scss";
@import "../style/_variables.scss";

@mixin box {
  // width: calc(100% - 100px);
  border: 1px solid $white;
  color: $white;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 20px;
}

@mixin label {
  display: inline-block;
  font-size: $font-size-small;
  letter-spacing: 1px;
  text-transform: uppercase;
  width: 12ch;
  @include screen-size("medium") {
    font-size: 12px;
    width: auto;
  }
}

.exhibition {
  @include hide-scroll;
  display: none;
  height: 100vh;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 90vw;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 80px;
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
  background: $black;
  height: 100vh;
  left: 0;
  overflow-y: auto;
  padding: 30px;
  padding-top: 80px;
  position: fixed;
  top: 0;
  width: 100vw;
  &__hash {
    @include box;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    margin-bottom: 180px;
    line-height: 1.6em;
    &__label {
      @include label;
    }
  }
}
</style>
