<script lang="ts">

import NavBarForAll from "@/components/unauth/NavBarForAll.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

export default {
  components: {
    NavBarForAll
  },
  computed: {
    currentComponent() {
      switch (this.$route.path) {
        case '/about':
          return AboutView;
        case '/login':
          return LoginView;
        case '/register':
          return RegisterView
        default:
          return null;
      }
    }
  }
};
</script>

<template>
  <div>
    <NavBarForAll></NavBarForAll>
    <div class="componentcontainer">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>
