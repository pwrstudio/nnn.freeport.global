<template>
  <div>
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

      <div class='info-overlay__location'>
        <span class='info-overlay__title__label'
              v-html='"location"' />
        <span v-html='"Berlin, Germany"' />
      </div>

      <div v-if='payload.description' class='info-overlay__description' v-html='payload.description'/>

    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
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
    const httpPromise = this.$http.get('https://ipfs.io/ipfs/' + this.$route.params.hash)
    httpPromise.then(response => {
      this.payload = response.body
      this.SET_CURRENT_WORK(this.payload)
    })
    httpPromise.catch(err => {
      console.log(err)
    })
  },
  computed: {
    artistList() {
      return this.payload.artists.reduce(
        (accumulator, currentValue) => accumulator + ', ' + currentValue
      )
    }
  },
  methods: {
    ...mapActions(['SET_CURRENT_WORK'])
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  @include hide-scroll;
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
  &__description {
    @include box;
    &__label {
      @include label;
    }
  }
}
</style>
