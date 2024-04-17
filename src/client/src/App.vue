<script lang="ts">
  export default {
    name: "App"
  };
</script>

<template>
  <router-view name="navbar"></router-view>
  <router-view></router-view>
</template>

<style>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.content-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  height: 100%;
}
</style>
