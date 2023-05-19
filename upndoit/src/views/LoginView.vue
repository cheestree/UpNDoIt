<script setup>
    import axios from 'axios';
    async function login(fields){
      let res = await axios.post('http://localhost:25565/login', fields)
      alert(JSON.stringify(fields))
    }
</script>

<template>
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
                name="loginname"
                id="loginname"
                validation="required|not:Admin"
                label="Username"
                placeholder="Insert your username"
            />
            <FormKit
                type="text"
                name="loginpass"
                id="loginpass"
                validation="required|not:Admin"
                label="Password"
                placeholder="Insert your password"
            />
        </FormKit>
        <small>Don't have an account? <RouterLink to="/register">Make one here!
        </RouterLink></small>
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
  