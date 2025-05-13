// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import ItemProducto from './components/ItemProducto.vue' // Asegúrate de que la ruta sea correcta

const routes = [
   {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue') // Deberías crear este archivo
   },
   {
      path: '/productos',
      name: 'home',
      // component: () => import('./components/ObtenerProductos.vue') // Deberías crear este archivo
      component: () => import('./components/MostrarPedir.vue') // Deberías crear este archivo
   },
   {
      path: '/about',
      name: 'about',
      component: () => import('./views/AboutView.vue') // Deberías crear este archivo
   },
   {
      path: '/productos/:id',
      component: ItemProducto,
      props: true
   }
]

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes
})

export default router