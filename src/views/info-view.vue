<template>
  <div class="info">
    <div class="info__inner">
      <!-- Main -->
      <div class="info__inner__main">
        <video
          src="https://cloudflare-ipfs.com/ipfs/QmfQU5sQPSAd67Fn9Jz2NUp56TURLKKFArrcCMcygDCXTZ"
          controls
          poster="https://cloudflare-ipfs.com/ipfs/QmYjRx5do6QyDEPrxYfV44g67GuRDMFX6A1X8kvdQYSBMV"
        />
        <div class="info__inner__main__text" v-html="main.container.about.info"/>
        <div id="tech">- - - - - - - - -</div>
        <div class="info__inner__tech__text">
          <p>This platform experiments with the peer to peer, content-addressed system Inter Planetary File System (IPFS) as backend, with the platform acting as a hybrid HTTP/IPFS gateway to the artworks and content.</p>
          <img class="info__inner__tech__image" src="static/architecture.svg">
          <p>IPFS is one component in an emerging stack of web technologies. While still in its infancy, it promises to steer the development of digital communications in a distributed, peer-to-peer direction. Replacing central points of authority with protocol mechanisms, relying on blockchain related techniques for control and governance. And moving storage and computation from data centers to the devices of the users.</p>
          <img class="info__inner__tech__image" src="static/stack.svg">
          <p>Instead of referring to objects by their location, which server they are stored on, IPFS refers to them by what they are, by making a cryptographic fingerprint – a hash – of the content. This allows information to be addressed in a permanent manner and located on a peer to peer network.</p>
          <img class="info__inner__tech__image" src="static/hash.svg">
        </div>
      </div>
      <!-- Sidebar -->
      <div class="info__inner__sidebar">
        <div class="info__inner__sidebar__divider">- - - - - - - - -</div>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="841.89px"
          viewBox="0 0 841.89 595.28"
          enable-background="new 0 0 841.89 595.28"
          xml:space="preserve">
          <polygon
            fill="#FFFFFF"
            points="772.229,194.521 673.657,405.165 671.903,147.574 588.979,108.771 450.3,405.165 448.546,147.574 
	365.621,108.771 226.941,405.165 225.188,147.574 142.264,108.771 17.016,376.424 71.064,401.717 175.004,179.598 174.721,450.222 
	253.571,487.121 398.362,179.598 398.077,450.222 476.93,487.121 621.721,179.598 621.437,450.222 700.287,487.121 825.535,219.467 
	"></polygon>
        </svg>
        <span class="info__inner__sidebar__text" v-html="main.container.about.credits"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'infoView',
  computed: {
    ...mapState(['main']),
  },
}
</script>

<style scoped lang="scss">
@import "../style/helpers/_mixins.scss";
@import "../style/helpers/_responsive.scss";
@import "../style/_variables.scss";

.info {
  color: $white;
  padding-top: 80px;
  // height: calc(100vh - 80px);
  overflow-y: auto;

  &__inner {
    margin-bottom: 200px;

    &__tech {
      &__image {
        display: block;
        width: 80%;
        // margin-right: auto;
        // margin-left: auto;
        @include screen-size("small") {
          width: 100%;
        }
      }
    }

    &__main {
      width: calc(70vw - 80px);
      float: left;
      padding-left: 40px;
      padding-right: 40px;
      font-size: $font-size-medium;
      line-height: $line-height-medium;
      margin-bottom: 200px;

      video {
        display: block;
        // margin-right: auto;
        // margin-left: auto;
        max-width: 80%;
      }

      @include screen-size("small") {
        font-size: $font-size-small;
        line-height: $line-height-small;
        width: calc(100vw - 40px);
        margin-bottom: 0;
        padding-left: 20px;
        padding-right: 20px;
        video {
          max-width: 100%;
        }
      }
    }

    &__sidebar {
      width: calc(30vw - 80px);
      float: left;
      padding-left: 40px;
      padding-right: 40px;
      font-size: $font-size-small;
      line-height: 24px;

      svg {
        background: $green;
        width: 100%;
      }

      &__divider {
        display: none;
        @include screen-size("small") {
          display: block;
        }
      }

      @include screen-size("small") {
        width: calc(100vw - 40px);
        padding-left: 20px;
        padding-right: 20px;
        margin-bottom: 200px;
      }
    }
  }
}
</style>
