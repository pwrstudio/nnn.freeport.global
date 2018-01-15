import Vue from 'vue'
import Router from 'vue-router'
// Views
import stackView from '@/views/stack-view'
import singleWorkView from '@/views/single-work-view'
import singleContentView from '@/views/single-content-view'
import statusView from '@/views/status-view'
import infoView from '@/views/info-view'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'status',
      component: statusView
    },
    {
      path: '/stack/:unit?',
      name: 'stack',
      component: stackView
    },
    {
      path: '/info',
      name: 'info',
      component: infoView
    },
    {
      path: '/w/:hash/:info?',
      name: 'singleWork',
      component: singleWorkView
    },
    {
      path: '/c/:hash',
      name: 'singleContent',
      component: singleContentView
    }
  ]
})
