import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { Home } from '../views/Home'
import { About } from '../views/About'
import { Convert, render } from '../api'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Convert(Home)
  },
  {
    path: '/about',
    name: 'About',
    component: Convert(About)
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


render.plugin({
  data(config: any) {
    config.router = router;
  }
});

export default router
