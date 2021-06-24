import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../views/Home.vue';
import Form from '../views/FormTest.vue';
import Debug from '../views/Debug.vue';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  },
  {
    path: '/debug',
    name: 'FormDebug',
    component: Debug
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
