<script lang="ts">
import AuthNavbar from "@/components/auth/AuthNavbar.vue";
import UnauthNavbar from "@/components/unauth/UnauthNavbar.vue";
import {useAuthStore} from "@/store/authStore";
import {defineComponent, onMounted, ref, watch} from "vue";

export default defineComponent({
  name: "NavbarComponent",
  computed: {
    UnauthNavbar() {
      return UnauthNavbar
    },
    AuthNavbar() {
      return AuthNavbar
    }
  },
  data() {
    return {
      store: useAuthStore()
    }
  },
  setup() {
    const store = useAuthStore();
    const isAuthenticated = ref(store.isAuthenticated);

    watch(
        () => store.isAuthenticated,
        (newIsAuthenticated) => {
          isAuthenticated.value = newIsAuthenticated;
        }
    );

    onMounted(() => {
      store.checkAuth();
    });

    return { isAuthenticated };
  },
})
</script>

<template>
  <component :is="isAuthenticated ? AuthNavbar : UnauthNavbar"></component>
</template>

<style>

</style>
