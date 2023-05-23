import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import WeatherView from '../views/WeatherView.vue';
import TaskView from '../views/TaskView.vue'
import AuthHomeView from '../views/HomeAuthView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/auth/home',
      name: 'authhome',
      component: AuthHomeView
    },
    {
      path: '/auth/apps/weather',
      name: 'weather',
      component: WeatherView
    },
    {
      path: '/auth/apps/taskmanager',
      name: 'taskmanager',
      component: TaskView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
