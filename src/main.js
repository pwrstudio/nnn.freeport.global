import Vue from 'vue'
import 'babel-polyfill'
import App from './App'
import router from './router'
import store from './store'
import VueHead from 'vue-head'
import VueSocketio from 'vue-socket.io'
import VTooltip from 'v-tooltip'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven.config('https://78715195611e4cc39b7bd889c729a53c@sentry.io/278723')
  .addPlugin(RavenVue, Vue)
  .install()

// ga(router, 'UA-112230518-2')

Vue.config.productionTip = false

Vue.use(VueHead)
Vue.use(VTooltip)
Vue.use(VueSocketio, 'https://nnnfreeportrelay.now.sh')
// Vue.use(VueSocketio, 'localhost:9090')
// Vue.use(VueSocketio, '192.168.178.25:9090')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
})
