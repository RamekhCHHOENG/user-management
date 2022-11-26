import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../wireframes/NAppWireframe'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/Login')
  }, 
  {
    path: '/users',
    name: 'Users',
    component: () => import('@/views/user-management/index')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
