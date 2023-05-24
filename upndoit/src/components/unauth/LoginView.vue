<script setup>
    import axios from 'axios';
    import { useRouter } from 'vue-router';

    const router = useRouter();

    async function login(fields){
      let res = await fetch('http://localhost:25565/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // This here
        body: JSON.stringify(fields),
      });
      if(res.status == '200'){
        router.push('/auth/home');
      } else {
        alert("Something went wrong making your account");
      }
    }
</script>

<template>
  <div class="contentcontainer">
    <div class="logincard">
        <h1>Login</h1>
        <FormKit type="form"
        id="loginsubmit"
        submit-label="Login"
        @submit="login"
        :submit-attrs="{
            ignore: false
        }">
            <FormKit
                type="text"
                name="username"
                id="username"
                validation="required|not:Admin"
                label="Username"
                placeholder="Insert your username"
            />
            <FormKit
                type="text"
                name="password"
                id="password"
                validation="required|not:Admin"
                label="Password"
                placeholder="Insert your password"
            />
        </FormKit>
        <small>Don't have an account? <RouterLink to="/register">Make one here!
        </RouterLink></small>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
  