import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/components/unauth/HomeView.vue";
import HomeAuthView from "@/components/auth/HomeAuthView.vue";
import TaskView from '@/views/TaskView.vue';
import WeatherView from "@/views/WeatherView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '', redirect: '/home' },
        {
            path: '/',
            component: HomeView,
            meta: { requiresAuth: false },
            children: [
                { path: 'home', name: 'home', component: HomeView },
                { path: 'about', name: 'about', component: HomeView },
                { path: 'login', name: 'login', component: HomeView },
                { path: 'register', name: 'register', component: HomeView },
            ]
        },
        {
            path: '/auth',
            component: HomeAuthView,
            meta: { requiresAuth: true },
            children: [
                { path: 'home', name: 'authhome', component: HomeAuthView },
                { path: 'apps/weather', name: 'weather', component: WeatherView },
                { path: 'apps/task', name: 'task', component: TaskView }
            ]
        }
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
                if (response.ok) {
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
