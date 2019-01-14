<template>
  <div class='slide-over'>
    <!-- IMAGE SET -->
    <div class="slide-over__image_set">

      <img v-if='slides.length > 0' :src="getImageLink(this.slides[index].hash)">

      <div @click='prevSlide' class='slideshow-button slideshow-button-prev'>
        <i class='material-icons material-icons--on'>keyboard_arrow_left</i>
      </div>

      <div @click='nextSlide' class='slideshow-button slideshow-button-next'>
        <i class='material-icons material-icons--on'>keyboard_arrow_right</i>
      </div>

      <div @click='close' class='slideshow-close'>CLOSE</div>

      <div class='slideshow-info'>
        <span class='slideshow-counter'>( {{index + 1}} / {{slides.length}} )</span>
        <span v-if='slides.length > 0' class='slideshow-caption' v-html='slides[index].caption'/>
      </div>
    </div>
    <!-- END: IMAGE SET -->
  </div>
</template>


<script>
import ImgixClient from 'imgix-core-js'

export default {
  name: 'slideShowOverlay',
  data() {
    return {
      payload: {
        media: '',
        hash: '',
        title: '',
        size: 0,
        loaded: false,
      },
      index: 0,
      activeSlideShow: [],
      slides: [],
    }
  },
  mounted() {
    // Get the content from IPFS
    const httpPromise = this.$http.get(
      'https://cloudflare-ipfs.com/ipfs/' + this.$route.params.hash,
    )
    httpPromise.then(response => {
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

      // ***
      this.activeSlideShow = this.payload.slideshow.find(
        s => s[0][0].id === this.$route.params.id,
      )

      // ***
      var collectedPromises = []
      this.activeSlideShow[0].forEach(s => {
        const httpPromise = this.$http.get(
          'https://cloudflare-ipfs.com/ipfs/' + s.hash,
        )
        collectedPromises.push(httpPromise)
        httpPromise.then(response => {
          this.slides.push(JSON.parse(response.bodyText))
        })
        httpPromise.catch(console.log)
      })

      Promise.all(collectedPromises)
        .then(() => {
          this.slides.forEach(s => {
            if (!s.order) {
              s.order = 0
            }
          })
          this.slides.sort(this.compare)
        })
        .catch(err => {
          console.log('ERROR')
        })
    })
    httpPromise.catch(e => {
      this.$router.push({ name: 'notFound' })
    })
  },
  methods: {
    getImageLink(imageHash) {
      const options = { w: 1200, auto: 'compress,format' }
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
      if (this.index === this.slides.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
    },
    prevSlide() {
      if (this.index === 0) {
        this.index = this.slides.length - 1
      } else {
        this.index--
      }
    },
    close() {
      this.$router.push({
        name: 'singleWork',
        params: { hash: this.$route.params.hash },
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import "../style/helpers/_mixins.scss";
@import "../style/helpers/_responsive.scss";
@import "../style/_variables.scss";

.slide-over {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: $black;
  display: block;
  z-index: 1000;

  &__image_set {
    cursor: pointer;
    max-width: 100%;
    height: 100vh;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 30px;
    user-select: none;
    img {
      max-width: 90%;
      max-height: 75%;
      margin-right: auto;
      margin-left: auto;
      display: block;
      @include center;
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
    width: 70px;
    font-size: 68px;
    line-height: 60px;

    @include screen-size("small") {
      font-size: 38px;
      line-height: 65px;
    }
  }

    &:hover {
    .material-icons {
      color: $green;
    }
  }

  &:active {
    background: white;
    .material-icons {
      color: black !important;
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
  width: 100%;
  color: white;
  text-align: center;  
  font-size: $font-size-xs;
  line-height: $line-height-small;
  margin-bottom: 10px;
  margin-top: 25px;
  min-height: 60px;
  @include center-horizontal;
  bottom: 0px;
  &:active {
    background: white;
    .material-icons {
      color: black;
    }

  }
  span {
    display: inline;
    p {
      margin-bottom: 0;
      padding-bottom: 0;
    }
  }
}

.slideshow-counter {
  color: $yellow;
  font-size: $font-size-xs;
}

.slideshow-close {
  position: fixed;
  top: 20px;
  @include center-horizontal;
  color: white;
  font-size: $font-size-small;
  padding: 5px 15px;
  border: 1px solid white;
  &:hover {
      border: 1px solid $green;
  }
  &:active {
      border: 1px solid $white;
      background: $white;
      color: $black; 
  }
}

</style>
