import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
     {
      path: '/Table1',
      name: 'Table1',
      component: () => import('../views/Table1.vue')
    },
     {
      path: '/Table2',
      name: 'Table2',
      component: () => import('../views/Table2.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/Form.vue')
    },
    {
      path: '/computed',
      name: 'computed',
      component: () => import('../views/Computed.vue')
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('../views/Event.vue')
    },
    {
      path: '/map-street',
      name: 'map-street',
      component: () => import('../views/Map/MapStreet.vue')
    },
    {
      path: '/heat-map-1',
      name: 'heat-map-1',
      component: () => import('../views/Map/heatmap1.vue')
    },
    {
      path: '/heat-map-2',
      name: 'heat-map-2',
      component: () => import('../views/Map/heatmap2.vue')
    },
    {
      path: '/heat-map-3',
      name: 'heat-map-3',
      component: () => import('../views/Map/heatmap3.vue')
    },
    {
      path: '/map-3d',
      name: 'map-3d',
      component: () => import('../views/Map/3d/index.vue')
    },
    {
      path: '/map-3d-zhejiang',
      name: 'map-3d-zhejiang',
      component: () => import('../views/Map/3d/zhejiang.vue')
    },
    {
      path: '/map-3d-chaoyang',
      name: 'map-3d-chaoyang',
      component: () => import('../views/Map/3d/chaoyang.vue')
    },
    {
      path: '/map-3d-chaoyang-bg',
      name: 'map-3d-chaoyang-bg',
      component: () => import('../views/Map/3d/chaoyang-bg.vue')
    },
    {
      path: '/map-3d-chaoyang-bg2',
      name: 'map-3d-chaoyang-bg2',
      component: () => import('../views/Map/3d/chaoyang-bg2.vue')
    },
    {
      path: '/map-3d-chaoyang-tooltip',
      name: 'map-3d-chaoyang-tooltip',
      component: () => import('../views/Map/3d/chaoyang-tooltip.vue')
    },
    {
      path: '/map-3d-chaoyang-tooltip-animation',
      name: 'map-3d-chaoyang-tooltip-animation',
      component: () => import('../views/Map/3d/chaoyang-tooltip-animation.vue')
    },
  ]
})

export default router
