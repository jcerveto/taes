<template>
    <div>
      <h2>Sign In</h2>
      <!-- Aquí iría tu formulario de inicio de sesión -->
      <button @click="signIn">Sign In</button>
      <router-link to="/register">Register</router-link>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      signIn() {
        // Lógica para iniciar sesión
        // Una vez iniciada la sesión, redirige a la página deseada
        this.$router.push('/dashboard');
      }
    }
  }
  </script>
  