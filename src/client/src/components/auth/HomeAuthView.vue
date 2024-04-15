<script lang="ts">

import NavBarForAuth from "@/components/auth/NavBarForAuth.vue";
import WeatherView from "@/views/WeatherView.vue";
import TaskView from "@/views/TaskView.vue";

export default {
  components: {
    NavBarForAuth
  },
  computed: {
    currentComponent() {
      switch (this.$route.path) {
        case '/auth/apps/weather':
          return WeatherView;
        case '/auth/apps/task':
          return TaskView;
        default:
          return null;
      }
    }
  }
};
</script>

<template>
  <div class="container">
    <NavBarForAuth></NavBarForAuth>
    <div class="component-container">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<style>
.container {
  height: 100%;
}
.component-container {
  height: 100%;
}
</style>
