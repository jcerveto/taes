<template>
    <div>
      <h2>Register</h2>
      <!-- Aquí iría tu formulario de registro -->
      <button @click="register">Register</button>
      <router-link to="/signin">Sign In</router-link>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      register() {
        // Lógica para registrar al usuario
        // Una vez registrado, redirige a la página deseada
        this.$router.push('/dashboard');
      }
    }
  }
  </script>
  