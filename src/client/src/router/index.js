import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthHomeView from '../views/HomeAuthView.vue'
import NProgress from 'nprogress'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'home', component: HomeView, meta: { disallowAuthed: true } },
    { path: '/about', name: 'about', component: HomeView, meta: { disallowAuthed: true } },
    { path: '/login', name: 'login', component: HomeView, meta: { disallowAuthed: true } },
    { path: '/register', name: 'register', component: HomeView, meta: { disallowAuthed: true } },
    { path: '/auth/home', name: 'authhome', component: AuthHomeView, meta: { requiresAuth: true } },
    { path: '/auth/apps/weather', name: 'weather', component: AuthHomeView, meta: { requiresAuth: true } },
    { path: '/auth/apps/taskmanager', name: 'taskmanager', component: AuthHomeView, meta: { requiresAuth: true } }
  ]
})

router.beforeEach(async (to, from, next) => {
  let response = await fetch('http://localhost:3000/api/user/auth', {
    method: "GET",
    headers: { "Content-Type": "application/json", },
    credentials: "include",
  }).then(res => res.json())
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(to.name){
    NProgress.start()
    if (requiresAuth && !response.success) {
      next('/login')
    }
    if (!requiresAuth && response.success) {
      next('/auth/home')
    }
    next();
  }
});

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
