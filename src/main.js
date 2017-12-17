import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import VueHead from 'vue-head'
import Notifications from 'vue-notification'
import VueSocketio from 'vue-socket.io'

// --- GOOGLE ANALYTICS
// import ga from 'vue-ga'
// --- ERROR TRACKING
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// Raven
//     .config('https://---0@sentry.io/---')
//     .addPlugin(RavenVue, Vue)
//     .install()

// ga(router, 'UA-XXXXX')

Vue.config.productionTip = false

Vue.use(VueHead)
Vue.use(Notifications)
Vue.use(VueSocketio, 'https://nnnfreeportrelay-acloxsxqqc.now.sh')
// Vue.use(VueSocketio, 'localhost:9090')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
