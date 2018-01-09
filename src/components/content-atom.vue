<template>
  <div class='atom'>

    <!-- TEXT -->
    <div v-if='payload.media === "Text"'
         class='atom__text'
         :id='hash'>
      <span v-html='text' />
      <router-link class='atom__text__link'
                   :to='{name: "singleContent", params: {hash: hash}}'>
        <i class="material-icons">arrow_forward</i>
      </router-link>
    </div>

    <!-- IMAGE -->
    <router-link v-else-if='payload.media === "Image"'
                 class='atom__image'
                 :to='{name: "singleContent", params: {hash: hash}}'
                 :id='hash'>
      <img :src='"https://ipfs.io/ipfs/" + payload.hash'>
    </router-link>

    <!-- AUDIO -->
    <router-link v-else-if='payload.media === "Audio"'
                 class='atom__audio'
                 :to='{name: "singleContent", params: {hash: hash}}'
                 :id='hash'>
      <audio :src='"https://ipfs.io/ipfs/" + payload.hash'
             controls/>
    </router-link>

    <!-- VIDEO -->
    <router-link v-else-if='payload.media === "Video"'
                 class='atom__audio'
                 :to='{name: "singleContent", params: {hash: hash}}'
                 :id='hash'>
      <video :src='"https://ipfs.io/ipfs/" + payload.hash'
             controls/>
    </router-link>

    <!-- TODO: FILE -->
    <!-- TODO: LINK -->
  </div>
</template>

<script>
import request from 'browser-request'
import ellipsize from 'ellipsize'

export default {
  name: 'contentAtom',
  data() {
    return {
      payload: {
        media: '',
        hash: '',
        title: ''
      },
      text: ''
    }
  },
  props: {
    hash: {
      type: String,
      required: false
    }
  },
  mounted() {
    request(
      {
        method: 'GET',
        url: 'https://ipfs.io/ipfs/' + this.hash,
        body: '{"relaxed":true}',
        json: true
      },
      (error, response, body) => {
        if (error) {
          throw error
        }
        this.payload = body
        if (this.payload.media === 'Text') {
          this.setIPFSText()
        }
        this.$notify({
          group: 'global',
          type: 'content',
          title: this.payload.title + ' – ' + this.payload.artists[0]
        })
      }
    )
  },
  computed: {
    sizeClass() {
      switch (this.size) {
        case 'large':
          return 'atom--large'
        case 'medium':
          return 'atom--medium'
        default:
          return 'atom--small'
      }
    }
  },
  methods: {
    setIPFSText() {
      request('https://ipfs.io/ipfs/' + this.payload.hash, (error, response, body) => {
        if (error) {
          throw error
        }
        this.text = ellipsize(body, 480)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.atom {
  cursor: pointer;
  display: block;
  flex: 2 2 800px;
  margin: 20px;
  position: relative;
  text-decoration: none !important;

  &__image {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  &__text {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__link {
      border: 1px solid $white;
      color: $white;
      display: block;
      padding: 20px;
      margin: 20px;
      text-align: center;
      max-width: 200px;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
  }
}
</style>
