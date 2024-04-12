<template>
  <div>
    <NavBarForAll></NavBarForAll>
    <div class="componentcontainer">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script lang="ts">
import NavBarForAll from '../components/unauth/NavBarForAll.vue'

import About from '../components/unauth/AboutView.vue';
import Login from '../components/unauth/LoginView.vue';
import Register from '../components/unauth/RegisterView.vue'

export default {
  components: {
    NavBarForAll
  },
  computed: {
    currentComponent() {
      switch (this.$route.path) {
        case '/about':
          return About;
        case '/login':
          return Login;
        case '/register':
          return Register
        default:
          return null;
      }
    }
  }
};
</script>
