<template>
  <div
    class="work"
    :class="{
      'work--open': payload.open,
      'work--closed': !payload.open,
      'work--open--active': green,
      'work--loaded': loaded
    }"
  >
    <div
      class="work__image"
      :style="'background-image: url(' + firstImage + ')'"
    />

    <!-- OPEN-->
    <router-link
      v-if="payload.open"
      :to="{ name: 'singleWork', params: { hash: hash } }"
      class="work__text"
      @mousedown.native="handleMouse"
    >
      <section>
        <div v-html="payload.title" />
        <div v-html="artistList" />
      </section>
    </router-link>
    <!-- END: OPEN-->

    <!--CLOSED -->
    <div v-if="!payload.open" class="work__text">
      <section>
        <div v-html="payload.title" />
        <div v-html="artistList" />
        <div class="work__text__timer" v-html="timeToPublish" />
        <i class="material-icons material-icons--large" v-if="showIcons"
          >close</i
        >
      </section>
    </div>
    <!-- END: CLOSED -->
  </div>
</template>

<script>
import countdown from "countdown";
import { isPast, parse } from "date-fns";
import ImgixClient from "imgix-core-js";

export default {
  name: "work",
  props: {
    hash: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loaded: false,
      showIcons: false,
      green: false,
      payload: {
        artists: [""],
        content: [],
        date: "",
        title: "",
        id: "",
        open: false,
        hash: ""
      },
      firstImage: "",
      content: [],
      timeToPublish: "",
      timerId: {},
      open: false,
      artistList: ""
    };
  },
  mounted() {
    const httpPromise = this.$http.get(
      "https://cloudflare-ipfs.com/ipfs/" + this.hash
    );
    httpPromise.then(response => {
      this.payload = response.body;
      this.payload.open = isPast(parse(this.payload.date));
      this.payload.hash = this.hash;
      this.setIcons();
    });
    httpPromise.catch(console.log);
  },
  methods: {
    handleMouse() {
      this.green = true;
    },
    setIcons() {
      if (this.payload.hash === this.$route.params.unit) {
        if (!this.payload.open) this.showIcons = true;
        else this.showIcons = false;
      }
    },
    setFirstImage() {
      const img = this.content.find(c => c.media === "Image");
      if (img) {
        let options = {};
        if (this.payload.open) {
          options = { w: 800, auto: "compress,format" };
        } else {
          options = {
            w: 800,
            auto: "compress,format",
            blur: 100,
            mono: 808080
          };
        }
        const client = new ImgixClient({
          domains: "nnnfreeport.imgix.net",
          secureURLToken: "A8qQj2zw8eqcXqEW"
        });
        let url = client.buildURL(
          "https://cloudflare-ipfs.com/ipfs/" + img.hash,
          options
        );
        this.firstImage = url;
      }
    },
    getArtistList() {
      if (this.payload.artists.length > 0) {
        return this.payload.artists.reduce(
          (accumulator, currentValue) => accumulator + ", " + currentValue
        );
      }
    }
  },
  watch: {
    $route() {
      this.setIcons();
    },
    "payload.date"() {
      countdown.setLabels(
        "ms|s|m|h|d|w|m|y|d|s|m",
        "ms|s|m|h|d|w|m|y|d|s|m",
        ":",
        ":",
        "now"
      );
      // countdown.setLabels('||:|:|:|:|:|:|:|:|:', '||:|:|:|:|:|:|:|:|:', '', '', 'now')
      this.timerId = countdown(
        new Date(this.payload.date),
        ts => {
          this.timeToPublish = ts.toString();
        },
        [countdown.HOURS, countdown.MINUTES, countdown.SECONDS]
      );
    },
    "payload.content"() {
      if (this.payload.content.length === 0) {
        this.loaded = true;
      } else {
        this.payload.content.map(c => {
          const httpPromise = this.$http.get(
            "https://cloudflare-ipfs.com/ipfs/" + c.hash
          );
          httpPromise.then(response => {
            this.content.push(response.body);
            this.setFirstImage();
            this.loaded = true;
          });
          httpPromise.catch(console.log);
        });
      }
    },
    payload() {
      this.artistList = this.getArtistList();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../style/helpers/_mixins.scss";
@import "../style/helpers/_responsive.scss";
@import "../style/_variables.scss";

.work {
  background: $black;
  color: white;
  height: 100%;
  position: relative;
  user-select: none;
  width: 100%;
  opacity: 0;

  &--loaded {
    opacity: 1;
  }

  &--open {
    cursor: pointer;

    i {
      color: $green;
    }

    &--active {
      background: $green;

      i {
        color: $black;
      }
    }
  }

  &--closed {
    i {
      color: $red;
    }

    &:active {
      background: $red;

      i {
        color: $black;
      }
    }
  }

  &__image {
    background-position: center center;
    height: 100%;
    opacity: 0.5;
    width: 100%;
  }

  &:active &__image {
    opacity: 0;
  }

  &__text {
    align-items: center;
    color: $white;
    display: flex;
    font-size: 64px;
    height: 100%;
    justify-content: center;
    left: 0;
    line-height: 64px;
    position: absolute;
    text-align: center;
    text-decoration: none;
    top: 0;
    width: 100%;
    z-index: 1000;

    &__timer {
      word-break: break-all;
    }

    section {
      position: relative;
      width: 80vw;
      z-index: 100;

      @include screen-size("small") {
        margin-bottom: 15%;
      }
    }

    @include screen-size("small") {
      font-size: 30px;
      line-height: 30px;
    }

    @include screen-size("large") {
      font-size: 92px;
      line-height: 90px;
    }
  }
}

.material-icons--large {
  @include center;
  font-size: 100vh;
  z-index: -50;
  top: 48%;

  @include screen-size("small") {
    font-size: 90vw;
  }
}
</style>
