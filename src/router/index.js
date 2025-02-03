import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import MovimientosView from '@/views/MovimientosView.vue'
import EstadoActualView from '@/views/EstadoActualView.vue'
import InversionesView from '@/views/InversionesView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/Home',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/Movimientos',
    name: 'MovimientosView',
    component: MovimientosView
  },
  {
    path: '/EstadoActual',
    name: 'EstadoActualView',
    component: EstadoActualView
  },
  {
    path: '/Inversiones',
    name: 'InversionesView',
    component: InversionesView
  },
  
 // {
  //  path: '/about',
  //  name: 'about',
 // 
 //   component: function () {
 //     return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
 //   }
 // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
