import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import HomeAuthView from "@/views/HomeAuthView.vue";

const router = createRouter({
  history: createWebHistory(
      //  import.meta.env.BASE_URL
  ),
  routes: [
    { path: '/home', name: 'home', component: HomeView, meta: { requiresAuth: false  } },
    { path: '/about', name: 'about', component: HomeView, meta: { requiresAuth: false  } },
    { path: '/login', name: 'login', component: HomeView, meta: { requiresAuth: false } },
    { path: '/register', name: 'register', component: HomeView, meta: { requiresAuth: false  } },
    { path: '/auth/home', name: 'authhome', component: HomeAuthView, meta: { requiresAuth: true } },
    { path: '/auth/apps/weather', name: 'weather', component: HomeAuthView, meta: { requiresAuth: true } },
    { path: '/auth/apps/taskmanager', name: 'taskmanager', component: HomeAuthView, meta: { requiresAuth: true } }
  ]
})


router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        if (to.path !== '/login') {
            try {
                const response = await fetch('http://localhost:5000/api/user/auth', {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });
                const isSuccess = response.status === 200;
                if (isSuccess) {
                    next();
                } else {
                    alert("You need to log in to access this page.");
                    next('/login');
                }
            } catch (error) {
                console.error("Error while fetching authentication status:", error);
                next('/login');
            }
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router
