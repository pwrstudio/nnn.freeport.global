import Vue from "vue";
import Router from "vue-router";
// Views
const stackView = () => import('@/views/stack-view')
const scanView = () => import('@/views/scan-view')
const singleWorkView = () => import('@/views/single-work-view')
const exhibitionView = () => import('@/views/exhibition-view')
const statusView = () => import('@/views/status-view')
const infoView = () => import('@/views/info-view')
const tracking = () => import('@/views/tracking')
const notFound = () => import('@/views/not-found')
const refuse = () => import('@/views/refuse')

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'status',
      component: statusView
    },
    {
      path: '/tracking/:id',
      name: 'tracking',
      component: tracking
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
      path: '/&/:exhibitionHash',
      name: 'exhibitionView',
      component: exhibitionView
    },
    {
      path: '/:hash/:info?',
      name: 'singleWork',
      component: singleWorkView
    },
    {
      path: '/:hash/+/:singleHash',
      name: 'singleContent',
      component: singleWorkView
    },
    {
      path: '/404',
      name: 'notFound',
      component: notFound
    },
    {
      path: '/403',
      name: 'refuse',
      component: refuse
    }
  ]
})
