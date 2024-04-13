<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <ul id="navbar">
    <RouterLink to="/home">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
  </ul>
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

.navbar a:hover {
  background-color: red;
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
</style>
