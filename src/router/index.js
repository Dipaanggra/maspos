import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ProductView from '@/views/ProductView.vue'
import AddProduct from '@/views/AddProduct.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: AddProduct
    }
  ]
})

export default router
