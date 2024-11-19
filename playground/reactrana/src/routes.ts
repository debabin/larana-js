import { createRouter, createMemoryHistory } from 'vue-router'
import HomePage from './views/home-page.vue'
import BarPage from './views/bar-page.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: HomePage,
  },
  {
    path: '/bar',
    name: 'bar',
    meta: {
      title: 'Bar',
    },
    component: BarPage,
  },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
