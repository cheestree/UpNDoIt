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
  let res1 = await fetch('http://localhost:25565/checkauth', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
  let response = await res1.json()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if(to.name){
    NProgress.start()
    if (requiresAuth && !response.success) {
      next('/login')
    } else {
      if (!requiresAuth && response.success) {
        next('/auth/home')
      } else {
        next();
      }
    }
  }
});

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
