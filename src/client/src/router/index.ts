import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import Requests from "@/services/requests/Requests";
import Navbar from "@/components/navbar/Navbar.vue";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import UserServices from "@/services/UserServices";
import TaskView from "@/views/TaskView.vue";
import WeatherView from '@/views/WeatherView.vue';

const userServices = new UserServices(new Requests(), '/api/user');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/',
            components: {
                default: HomeView,
                navbar: Navbar
            },
            meta: { requiresAuth: false },
            children: [
                { path: 'home', name: 'home', components: { default: HomeView } },
                { path: 'about', name: 'about', components: { default: AboutView } },
                { path: 'login', name: 'login', components: { default: LoginView } },
                { path: 'register', name: 'register', components: { default: RegisterView } },
            ]
        },
        {
            path: '/auth',
            components: {
                default: HomeView,
                navbar: Navbar
            },
            meta: { requiresAuth: true },
            children: [
                { path: 'task', name: 'task', components: { default: TaskView } },
                { path: 'weather', name: 'weather', components: { default: WeatherView } },
            ]
        }
    ]
});


router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth || to.path === '/login') { next(); return; }
    try {
        const isLoggedIn = await userServices.checkAuth()
        if (isLoggedIn) {
            next();
        } else {
            alert("You need to log in to access this page.");
            next({ name: 'login' });
        }
    } catch (error) {
        console.error("Error while fetching authentication status:", error);
        next({ name: 'login' });
    }
});

export default router
