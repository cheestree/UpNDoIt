<script lang="ts">
import { useRouter } from 'vue-router'
import Requests from "@/services/requests/Requests";
import UserServices from "@/services/UserServices";
import {reactive} from "vue";

type Credentials = {
  username: string;
  password: string;
}

export default {
  name: "NavbarComponent",
  data() {
    return {
      router: useRouter(),
      isAuthenticated: reactive({
        isAuthenticated: false,
        setAuth(value: boolean){
          this.isAuthenticated = value
      }}),
      userServices: new UserServices(new Requests(), '/api/user')
    }
  },
  methods: {
    async login(fields: Credentials) {
      console.log(fields)
      await this.userServices.login(fields.username, fields.password).then(async res => {
        if (res.ok) {
          await this.router.push('/home')
        } else {
          await this.router.push('/login')
        }
      });
    },
    async logout() {
      await this.userServices.logout().then(() => {
        this.router.push('/login')
        this.isAuthenticated.setAuth(false)
      })
    },
    async checkAuth() {
      await this.userServices.checkAuth().then(res => {
        this.isAuthenticated.setAuth(res)
      });
    },
  },
  mounted() {
    this.checkAuth()
  },
}
</script>

<template>
  <nav id="navbar-container">
    <ul id="navbar">
      <RouterLink to="/home">Home</RouterLink>
      <div class="dropdown" v-if="isAuthenticated">
        <a style="user-select:none">Services<span class="material-symbols-outlined">expand_more</span></a>
        <div class="dropdown-content" v-if="isAuthenticated">
          <RouterLink to="/auth/weather">Weather</RouterLink>
          <RouterLink to="/auth/task">Tasks</RouterLink>
        </div>
      </div>
      <RouterLink v-if="isAuthenticated" to="/home" @click="logout()">Logout</RouterLink>
      <RouterLink v-if="!isAuthenticated" to="/login" >Login</RouterLink>
    </ul>
  </nav>
</template>

<style>
#navbar {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .4);
  display: flex;
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--nvbr);
  justify-content: space-around;
}

#navbar a {
  display: flex;
  color: white;
  text-align: center;
  padding: 12px;
  text-decoration: none;
}

.material-symbols-outlined {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48
}

.dropdown {
  float: left;
  overflow: hidden;
}

.dropdown .dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: var(--nvbr);
  font-family: inherit;
  /* Important for vertical align on mobile phones */
  margin: 0;
  /* Important for vertical align on mobile phones */
}

.navbar a:hover,
.dropdown:hover .dropbtn {
  background-color: red;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: var(--nvbr);
  min-width: 160px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {
  background-color: var(--nvbr-hover);
}

.dropdown:hover .dropdown-content {
  display: block;
}</style>
