<script setup>
    import axios from 'axios';
    async function register(fields){
        let res = await axios.post('http://localhost:25565/register', fields)
        alert(JSON.stringify(fields))
    }
</script>

<template>
    <div class="registercard">
        <h1>Register</h1>
        <FormKit type="form"
        id="registersubmit"
        submit-label="Register"
        @submit="register"
        :submit-attrs="{
            ignore: false
        }">
            <FormKit
                type="text"
                name="registername"
                id="registername"
                validation="required"
                label="Username"
                placeholder="Insert your username"
            />
            <div class="password">
              <FormKit
                type="password"
                name="registerpass"
                label="Password"
                validation="required|length:6|matches:/[^a-zA-Z]/"
                :validation-messages="{
                  matches: 'Please include at least one symbol',
                }"
                placeholder="Your password"
              />
              <FormKit
                type="password"
                name="registerpass_confirm"
                label="Confirm password"
                placeholder="Confirm password"
                validation="required|confirm"
              />
            </div>
            <FormKit
              type="date"
              name="date"
              label="Date of birth"
              :validation="[['required'], ['date_before']]">
            </FormKit>
        </FormKit>
        <small>Already have an account? <RouterLink to="/login">Login here!
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
  