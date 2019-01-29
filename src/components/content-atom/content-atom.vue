<template>
  <div
    class="atom"
    :class="[
      getSizeClass(),
      getImageClass(),
      { 'atom--loaded': payload.loaded }
    ]"
  >
    <!-- TEXT -->
    <div v-if="payload.media === 'Text'" class="atom__text" :id="hash">
      <div class="atom__text__title" v-html="payload.title" />
      <span v-html="text" />
      <router-link
        class="atom__text__link"
        :to="{ name: 'singleContent', params: { singleHash: hash } }"
      >
        <i class="material-icons">arrow_forward</i>
      </router-link>
    </div>
    <!-- END: TEXT -->

    <!-- IMAGE -->
    <router-link
      v-else-if="payload.media === 'Image'"
      class="atom__image"
      :to="{ name: 'singleContent', params: { singleHash: hash } }"
      :id="hash"
    >
      <img :src="getImageLink(payload.hash)" />
    </router-link>
    <!-- END: IMAGE -->

    <!-- AUDIO -->
    <div v-else-if="payload.media === 'Audio'" class="atom__audio" :id="hash">
      <audio-player
        :sources="['https://cloudflare-ipfs.com/ipfs/' + payload.hash]"
        :loop="false"
        :image="getImageLink(payload.poster)"
        :title="payload.title"
        :formats="['mp3']"
      />
    </div>
    <!-- END: AUDIO -->

    <!-- VIDEO -->
    <div v-else-if="payload.media === 'Video'" class="atom__video" :id="hash">
      <video-player
        :sources="['https://ipfs.io/ipfs/' + payload.hash]"
        image="/static/test.jpg"
        :title="payload.title"
        :hash="payload.hash"
        type="video/mp4"
      />
      <router-link
        class="atom__video__fullscreen"
        :to="{ name: 'singleContent', params: { singleHash: hash } }"
      >
        <i class="material-icons material-icons--on">fullscreen</i>
      </router-link>
    </div>
    <!-- END: VIDEO -->

    <!-- FILE (PDF)-->
    <div v-if="payload.media === 'File'" class="atom__file" :id="hash">
      <span v-html="payload.title + ' (' + payload.size + ')'" />
      <img v-if="payload.poster" :src="getImageLink(payload.poster)" />
      <object
        class="atom__file__embed"
        :data="'https://cloudflare-ipfs.com/ipfs/' + payload.hash"
        type="application/pdf"
      >
        <embed
          :src="'https://cloudflare-ipfs.com/ipfs/' + payload.hash"
          type="application/pdf"
        />
      </object>
      <a
        :href="'https://cloudflare-ipfs.com/ipfs/' + payload.hash"
        class="atom__file__link"
        target="_blank"
      >
        <i class="material-icons">get_app</i>
      </a>
    </div>
    <!-- END: FILE -->

    <!-- LINK -->
    <div
      v-if="payload.media === 'External link'"
      class="atom__external"
      :class="{ 'atom__external--has-image': payload.poster }"
      :id="hash"
    >
      <span
        class="atom__external__reference"
        v-if="payload.hierarchy === 'Reference'"
        v-html="'Reference'"
      />
      <span v-if="!payload.poster" v-html="payload.title" />
      <img
        v-if="payload.poster"
        class="atom__external__image"
        :src="getImageLink(payload.poster)"
      />
      <div v-if="embed.length > 1" class="video-container" v-html="embed" />
      <a :href="externalLink" class="atom__external__link" target="_blank">
        <i class="material-icons">open_in_new</i>
      </a>
    </div>
    <!-- END: LINK -->

    <!-- IMAGE SET -->
    <div
      v-else-if="payload.media === 'Image set'"
      class="atom__image_set"
      :id="hash"
    >
      <img :src="getImageLink(payload.hash)" />
    </div>
    <!-- END: IMAGE SET -->
  </div>
</template>

<script>
import ImgixClient from "imgix-core-js"
import ellipsize from "ellipsize"
import embed from "embed-video"

import AudioPlayer from "@/components/content-atom/audio-player"
import VideoPlayer from "@/components/content-atom/video-player"

export default {
  name: "contentAtom",
  data() {
    return {
      payload: {
        media: "",
        hash: "",
        title: "",
        size: 0,
        loaded: false,
      },
      text: "",
      externalLink: "",
      embed: "",
      video: {
        options: {},
      },
    }
  },
  props: {
    hash: {
      type: String,
      required: false,
    },
  },
  mounted() {
    const httpPromise = this.$http.get(
      "https://cloudflare-ipfs.com/ipfs/" + this.hash,
    )
    httpPromise.then(response => {
      this.payload = response.body
      if (this.payload.media === "Text") {
        this.setIPFSText()
      } else if (this.payload.media === "External link") {
        this.getLink()
      }
      this.payload.loaded = true
    })
    httpPromise.catch(console.log)
  },
  methods: {
    setIPFSText() {
      const httpPromise = this.$http.get(
        "https://cloudflare-ipfs.com/ipfs/" + this.payload.hash,
      )
      httpPromise.then(response => {
        this.text = ellipsize(response.body, 480)
      })
      httpPromise.catch(console.log)
    },
    getLink() {
      const httpPromise = this.$http.get(
        "https://cloudflare-ipfs.com/ipfs/" + this.payload.hash,
      )
      httpPromise.then(response => {
        this.externalLink = response.body
        if (
          response.body.includes("youtube") ||
          response.body.includes("vimeo")
        ) {
          this.embed = embed(response.body)
        }
      })
      httpPromise.catch(console.log)
    },
    getImageLink(imageHash) {
      const options = { w: 800, auto: "compress,format" }
      const client = new ImgixClient({
        domains: "nnnfreeport.imgix.net",
        secureURLToken: "A8qQj2zw8eqcXqEW",
      })
      let url = client.buildURL(
        "https://cloudflare-ipfs.com/ipfs/" + imageHash,
        options,
      )
      return url
    },
    getSizeClass() {
      let r = Math.random()
      if (r < 0.33) {
        return "atom--small"
      }
      if (r > 0.66) {
        return "atom--large"
      } else {
        return "atom--medium"
      }
    },
    getImageClass() {
      if (
        this.payload.media === "Image" ||
        this.payload.media === "Audio" ||
        this.payload.media === "Video" ||
        (this.payload.media === "Link" && this.payload.poster)
      ) {
        return "atom--image"
      } else {
        return ""
      }
    },
  },
  components: {
    AudioPlayer,
    VideoPlayer,
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

  &--small {
    flex: 2 1 300px;
  }
  &--medium {
    flex: 2 2 400px;
  }
  &--large {
    flex: 1 2 600px;
  }

  &--image {
    border: none;
  }

  &__image {
    cursor: pointer;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    border: 1px solid transparent;
    &:hover {
      border: 1px solid $green;
    }
  }

  &__text {
    color: white !important;
    padding: 20px;
    text-decoration: none !important;

    &__title {
      font-size: $font-size-small;
      margin-bottom: $line-height;
    }

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

  &__file {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__embed {
      display: block;
      margin-top: 20px;
      width: 100%;
      height: 400px;
    }
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

  &__audio {
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

  &__external {
    padding: 20px;
    color: white !important;
    text-decoration: none !important;
    &__reference {
      float: right;
    }
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
    &--has-image {
      padding: 0;
      // width: 300px;
      height: 300px;
      border: none;
    }
    &--has-image &__link {
      @include center;
      border: none;
      color: $white;
      display: block;
      padding: 40px;
      padding: 40px;
      i {
        font-size: 96px;
      }
      text-align: center;
      max-width: none;
      float: right;
      &:hover {
        background: $green;
        color: $white;
      }
    }
    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__video {
    max-width: 100%;
    position: relative;
    border: 1px solid $white;
    padding: 10px;

    &__fullscreen {
      position: absolute;
      right: 10px;
      bottom: 10px;
      i {
        font-size: 48px;
      }

      &:hover {
        color: $green;
      }
    }
  }
}

video {
  max-width: 400px;
}
</style>
