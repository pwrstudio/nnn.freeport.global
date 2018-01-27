import Vue from 'vue'
import Router from 'vue-router'
// Views
const stackView = () => import('@/views/stack-view')
const scanView = () => import('@/views/scan-view')
const singleWorkView = () => import('@/views/single-work-view')
const statusView = () => import('@/views/status-view')
const infoView = () => import('@/views/info-view')

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
      path: '/scan',
      name: 'scan',
      component: scanView
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
      path: '/w/:hash/c/:singleHash',
      name: 'singleContent',
      component: singleWorkView
    }
  ]
})
