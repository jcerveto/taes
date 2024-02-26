<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label><br>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div><br>
          <label for="email">Email:</label><br>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div><br>
          <button type="submit">Register</button>
        </div>
      </form><br>
      <br>
      <p>Do you have an account?</p>
      <router-link to="/signin">Sign In</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      register() {
        // Aquí normalmente enviarías estos datos a tu backend para registrar al usuario
        // Por ahora, solo simularemos el registro
        const userData = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        
        // Aquí puedes hacer algo con los datos, como enviarlos a una API
        console.log('User Data:', userData);
        
        // Luego podrías redirigir al usuario a la página de inicio de sesión
        this.$router.push('/signin');
      },
    },
  };
  </script>
  