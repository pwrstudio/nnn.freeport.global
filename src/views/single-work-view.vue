<template>
  <div>
    <router-link v-if='$route.params.info' :to='{name: "singleWork", params: {hash: $route.params.hash}}' class='nav-button nav-button__left'>
      {{payload.title}}
    </router-link>
    <router-link v-else :to='{name: "singleWork", params: {hash: $route.params.hash, info: "info"}}' class='nav-button nav-button__left'>
      {{payload.title}}
    </router-link>
    <div class='work'>
      <contentAtom v-for='item in payload.content'
                   :key='item.hash'
                   :hash='item.hash' />
    </div>
    <div v-if='$route.params.info' class='info-overlay'>
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

      <div class='info-overlay__exhibition'>
        <span class='info-overlay__exhibition__label'
              v-html='"exhibition"' />
        <span v-html='"Territories of Complicity"' />
      </div>

      <div class='info-overlay__location'
           v-text=''>
        <span class='info-overlay__title__label'
              v-html='"location"' />
        <span v-html='"Berlin, Germany"' />
      </div>

    </div>
  </div>
</template>

<script>
import request from 'browser-request'
import contentAtom from '@/components/content-atom'
export default {
  name: 'singleWork',
  components: {
    contentAtom
  },
  data() {
    return {
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
    request(
      {
        method: 'GET',
        url: 'https://ipfs.io/ipfs/' + this.$route.params.hash,
        body: '{"relaxed":true}',
        json: true
      },
      (error, response, body) => {
        if (error) {
          throw error
        }
        this.payload = body
      }
    )
  },
  computed: {
    artistList() {
      return this.payload.artists.reduce(
        (accumulator, currentValue) => accumulator + ', ' + currentValue
      )
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

@mixin box {
  padding: 20px;
  border: 1px solid $white;
  margin-bottom: 20px;
  width: calc(100% - 100px);
  color: $white;
}

@mixin label {
  font-size: 14px;
  text-transform: uppercase;
  width: 12ch;
  display: inline-block;
  letter-spacing: 1px;
  @include screen-size('medium') {
    font-size: 12px;
  }
}

.work {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  padding-top: 60px;
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
  &__hash {
    @include box;
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
}
</style>
