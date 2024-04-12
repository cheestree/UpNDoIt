<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
const router = useRouter();

async function logout() {
  await fetch('http://localhost:25565/logout', { method: 'POST', credentials: "include" })
  router.push('/home');
}
</script>

<template>
  <nav id="navbarcontainer">
    <ul id="navbar">
      <div class="navbaritem">
        <RouterLink to="/auth/home">Home</RouterLink>
      </div>
      <div class="dropdown">
        <div class="navbaritem">
          <a style="user-select:none">Services<span class="material-symbols-outlined">expand_more</span></a>
          <div class="dropdown-content">
            <div class="navbaritem">
              <RouterLink to="/auth/apps/weather">Weather</RouterLink>
            </div>
            <div class="navbaritem">
              <RouterLink to="/auth/apps/taskmanager">Tasks</RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="navbaritem">

      </div>
      <div class="navbaritem">
        <RouterLink to="/home" @click="logout()">Logout</RouterLink>
      </div>
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
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
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
