import Vue from 'vue'
import Router from 'vue-router'
// Views
const stackView = () => import('@/views/stack-view')
const scanView = () => import('@/views/scan-view')
const singleWorkView = () => import('@/views/single-work-view')
const singleContentView = () => import('@/views/single-content-view')
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
      path: '/c/:hash',
      name: 'singleContent',
      component: singleContentView
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'singleContent') {
      console.log('going to single work', window.scrollY)
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
