import Vue from 'vue'
import Router from 'vue-router'
// Views
import stackView from '@/views/stack-view'
import singleWorkView from '@/views/single-work-view'
import statusView from '@/views/status-view'
import infoView from '@/views/info-view'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'stackView',
      component: stackView
    },
    {
      path: '/status',
      name: 'status',
      component: statusView
    },
    {
      path: '/info',
      name: 'info',
      component: infoView
    },
    {
      path: '/:slug',
      name: 'singleWork',
      component: singleWorkView
    }
  ]
})
