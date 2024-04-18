import UserServices from "@/services/UserServices";
import Requests from "@/services/requests/Requests";
import {useRouter} from "vue-router";
import type {Credentials} from "@/services/models/Credentials";
import {defineStore} from "pinia";

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            userServices: new UserServices(new Requests(), '/api/user'),
            router: useRouter(),
        }
    },
    actions: {
        async checkAuth() {
            await this.userServices.checkAuth().then(res => {
                this.isAuthenticated = res
            });
        },
        async login(fields: Credentials) {
            await this.userServices.login(fields.username, fields.password).then(async res => {
                let path: string;
                let isAuth: boolean;
                if (res.ok) {
                    isAuth = true
                    path = '/home'
                } else {
                    isAuth = false
                    path = '/login'
                }
                this.isAuthenticated = isAuth
                await this.router.push(path)

            });
        },
        async logout() {
            await this.userServices.logout().then(async () => {
                this.isAuthenticated = false
                await this.router.push('/login')
            })
        },
    }
})
