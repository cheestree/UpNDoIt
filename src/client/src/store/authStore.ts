import {defineStore} from "pinia";
import UserServices from "@/services/UserServices";
import Requests from "@/services/requests/Requests";
import {useRouter} from "vue-router";
import type {Credentials} from "@/services/models/Credentials";

export const useAuthStore = defineStore('auth', {
    state() {
        return {
            isAuthenticated: false,
            userServices: new UserServices(new Requests(), '/api/user'),
            router: useRouter(),
        }
    },
    getters: {
      getIsAuthenticated(): Boolean {
          return this.isAuthenticated
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
                if (res.ok) {
                    await this.router.push('/home')
                } else {
                    await this.router.push('/login')
                }
            });
        },
        async logout() {
            await this.userServices.logout().then(async () => {
                await this.router.push('/login')
            })
        },
    }
})
