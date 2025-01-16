import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// import
const routes = [
  {
    path: '/',
    // name:'Index',
    // component:()=>import('@/views/welcome')
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Main',
    component: () => import('@/views/main-layout')
  }
]

const router = new Router({
  routes: routes
})

export default router