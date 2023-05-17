<script setup>
import TaskItemAdd from './components/TaskItemAdd.vue';
import TaskList from './components/TaskList.vue';
import NavBarForAll from './components/NavBarForAll.vue';
</script>

<template>
  <div>
    <NavBarForAll/>
  </div>
  <div>
    <TaskList/>
    <TaskItemAdd/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
</style>