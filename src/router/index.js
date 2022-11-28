import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../wireframes/NAppWireframe'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Dashboard,
    children: [
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/views/user-management/index')
      }
    ]
  },
  {
    path: '/auth',
    name: 'Auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/auth/Login')
  }, 
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/HomeView.vue')
  // },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('@/views/auth/ResetPassword.vue')
  },
  {
    path: '/user-inactive',
    name: 'UserInactive',
    component: () => import('@/views/auth/InactiveUser.vue')
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
