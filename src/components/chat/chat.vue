<template>
  <div class="chat">
    <div class="chat__top">
      <i class="material-icons" @click="TOGGLE_CHAT">do_not_disturb</i>
      <i class="material-icons" @click="TOGGLE_CHAT">clear</i>
    </div>
    <div class="chat__main">
      <div v-for="msg in convo" :key="msg.time" v-html="msg.txt" />
    </div>

    <div class="chat__bottom">
      <div class="chat__input" />
      <div class="chat__send">send</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "chat",
  data() {
    return {
      convo: [],
      id: ""
    };
  },
  computed: {
    ...mapState(["main"])
  },
  sockets: {
    chat(data) {
      console.log(data);
      this.convo.push({ txt: data.msg, remote: true, time: Date.now() });
      this.id = data.id;
    }
  },
  methods: {
    ...mapActions(["TOGGLE_CHAT"])
  }
};
</script>

<style scoped lang="scss">
@import "../../style/helpers/_mixins.scss";
@import "../../style/helpers/_responsive.scss";
@import "../../style/_variables.scss";

.chat {
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: calc(100vh - 160px);
  width: 300px;
  height: 400px;
  z-index: 10000;
  background: $white;
  font-size: $font-size-small;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);

  &__top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: $yellow;
    i {
      position: relative;
      top: 3px;

      &:first-child {
        margin-left: 5px;
        float: left;
      }
      &:last-child {
        margin-right: 5px;
        float: right;
      }
    }
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background: $yellow;
  }

  &__main {
    position: absolute;
    top: 30px;
    left: 0;
    width: 100%;
    height: calc(100% - 120px);
    padding: 20px;
    overflow-y: auto;
    @include hide-scroll;
  }
}
</style>
