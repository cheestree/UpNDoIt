<script lang="ts">
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import AboutView from "@/views/AboutView.vue";
import TaskView from "@/views/TaskView.vue";
import WeatherView from "@/views/WeatherView.vue";

export default {
  computed: {
    currentComponent() {
      switch (this.$route.path) {
        case '/about':
          return AboutView;
        case '/login':
          return LoginView;
        case '/register':
          return RegisterView
        case '/auth/task':
          return TaskView
        case '/auth/weather':
          return WeatherView
        default:
          return null;
      }
    }
  }
};
</script>

<template>
    <component :is="currentComponent"></component>
</template>
