<script setup>
import NavBarForAll from './components/NavBarForAll.vue';
</script>

<template>
  <body>
    <div class="wrapper">
      <NavBarForAll></NavBarForAll>
    </div>
    <RouterView/>
  </body>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');

html, body {
  font-family: 'Lilita One', cursive;
}
body {
  height: 50%;
}
.wrapper {
  width: 100%;
}
</style>