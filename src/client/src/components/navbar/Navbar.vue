<script lang="ts">
import AuthNavbar from "@/components/auth/AuthNavbar.vue";
import UnauthNavbar from "@/components/unauth/UnauthNavbar.vue";
import {useAuthStore} from "@/store/authStore";
import {computed, defineComponent, onMounted} from "vue";

export default defineComponent({
  name: "NavbarComponent",
  data() {
    return {
      store: useAuthStore()
    }
  },
  setup(props, ctx) {
    const store = useAuthStore();

    // Compute the navComponent based on the store's isAuthenticated state
    const navComponent = computed(() => {
      return store.isAuthenticated ? AuthNavbar : UnauthNavbar;
    });

    // Call checkAuth when the component is mounted
    onMounted(() => {
      store.checkAuth();
    });

    return {
      navComponent
    };
  },
  mounted() {
    this.store.checkAuth()
  },
})
</script>

<template>
  <component :is="navComponent"></component>
</template>

<style>

</style>
