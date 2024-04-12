<template>
  <div>
    <NavBarForAuth></NavBarForAuth>
    <div class="componentcontainer">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script lang="ts">
import NavBarForAuth from '../components/auth/NavBarForAuth.vue';

import Weather from '../components/auth/WeatherView.vue'
import TaskManager from '../components/auth/TaskView.vue'

export default {
  components: {
    NavBarForAuth
  },
  computed: {
    currentComponent() {
      switch (this.$route.path) {
        case '/auth/apps/weather':
          return Weather;
        case '/auth/apps/taskmanager':
          return TaskManager;
        default:
          return null;
      }
    }
  }
};
</script>
