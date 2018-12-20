<template>
  <div
    class="atom"
    :class="[imageSizeClass, 'atom--loaded']">

    <!-- IMAGE SET -->
    <div class="atom__image_set">
      <img :src="getImageLink(payload.slides[index].hash)">

      <div @click='prevSlide' class='slideshow-button slideshow-button-prev'>
        <i class='material-icons material-icons--on'>keyboard_arrow_left</i>
      </div>

      <div @click='nextSlide' class='slideshow-button slideshow-button-next'>
        <i class='material-icons material-icons--on'>keyboard_arrow_right</i>
      </div>

      <div class='slideshow-info'>
        <span class='slideshow-counter'>{{index + 1}} / {{payload.slides.length}}
          <span class='slideshow-caption' v-html='payload.slides[index].caption'/>
        </span>
      </div>
    </div>
    <!-- END: IMAGE SET -->

  </div>
</template>

<script>
import ImgixClient from 'imgix-core-js'

export default {
  name: 'slideShow',
  data() {
    return {
      payload: {
        media: '',
        hash: '',
        title: '',
        slides: [],
        size: 0,
        loaded: false,
      },
      index: 0,
    }
  },
  props: {
    slides: {
      type: Array,
      required: false,
    },
  },
  mounted() {
    var collectedPromises = []
    this.slides[0].forEach(s => {
      const httpPromise = this.$http.get(
        'https://cloudflare-ipfs.com/ipfs/' + s.hash,
      )
      collectedPromises.push(httpPromise)
      httpPromise.then(response => {
        this.payload.loaded = true
        this.payload.slides.push(JSON.parse(response.bodyText))
      })
      httpPromise.catch(console.log)
    })

    Promise.all(collectedPromises)
      .then(() => {
        this.payload.slides.forEach(s => {
          if (!s.order) {
            s.order = 0
          }
        })
        this.payload.slides.sort(this.compare)
      })
      .catch(err => {
        console.log('ERROR')
      })
  },
  computed: {
    imageSizeClass() {
      let r = Math.random()
      if (r < 0.33) {
        return 'atom--small'
      } else if (r > 0.66) {
        return 'atom--large'
      } else {
        return 'atom--medium'
      }
    },
  },
  methods: {
    getImageLink(imageHash) {
      const options = { w: 800, auto: 'compress,format' }
      const client = new ImgixClient({
        domains: 'nnnfreeport.imgix.net',
        secureURLToken: 'A8qQj2zw8eqcXqEW',
      })
      let url = client.buildURL(
        'https://cloudflare-ipfs.com/ipfs/' + imageHash,
        options,
      )
      return url
    },
    compare(a, b) {
      if (a.order < b.order) return -1
      if (a.order > b.order) return 1
      return 0
    },
    nextSlide() {
      if (this.index === this.payload.slides.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
    },
    prevSlide() {
      if (this.index === 0) {
        this.index = this.payload.slides.length - 1
      } else {
        this.index--
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";

.atom {
  display: none;
  margin: 20px;
  position: relative;
  text-decoration: none !important;
  height: auto;
  border: 1px solid $white;

  &--loaded {
    display: block;
  }

  &--image {
    border: none;
  }

    &--small {
    width: 400px;
  }
  &--medium {
    width: 600px;
  }
  &--large {
    width: 800px;
  }

  &__image_set {
    cursor: pointer;
    max-width: 100%;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 30px;
    user-select: none;
    img {
      max-width: 100%;
      max-height: 100%;
      margin-right: auto;
      margin-left: auto;
      display: block;
    }
  }

}

.slideshow-button {
  position: absolute;
  top: 0;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;

  .material-icons {
    color: white;
    height: 60px;
    width: 50px;
    font-size: 48px;
    line-height: 60px;

    @include screen-size("small") {
      font-size: 38px;
      line-height: 65px;
    }
  }

  &:active {
    background: white;
    .material-icons {
      color: black;
    }
  }
}

.slideshow-button-prev {
  left: 0;
}

.slideshow-button-next {
  right: 0;
}

.slideshow-info {
  // height: 50px;
  width: 100%;
  color: white;
  text-align: center;  
  font-size: $font-size-small;
  line-height: $line-height-small;
  &:active {
    background: white;
    .material-icons {
      color: black;
    }
  }

  span {
    display: inline;
  }
}
p {
  margin: 0 !important;
  display: inline !important;
  margin-block-start: 0em  !important;
  margin-block-end: 0em  !important;
  padding: 0;
  background: red;
}

</style>
