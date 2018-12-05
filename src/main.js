import Vue from "vue";
import "babel-polyfill";
import "whatwg-fetch";
import "proxy-polyfill";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueHead from "vue-head";
import VueSocketio from "vue-socket.io";
import VTooltip from "v-tooltip";
import ga from "vue-ga";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";

Raven.config("https://78715195611e4cc39b7bd889c729a53c@sentry.io/278723")
  .addPlugin(RavenVue, Vue)
  .install();

ga(router, "UA-112230518-2");

Vue.config.productionTip = false;

Vue.use(VueHead);
Vue.use(VTooltip);
Vue.use(VueSocketio, "https://nnnfreeportrelay.now.sh");

router.beforeEach((to, from, next) => {
  document.getElementsByTagName("body")[0].classList.add("loading");
  next();
});

router.afterEach((to, from) => {
  document.getElementsByTagName("body")[0].classList.remove("loading");
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
