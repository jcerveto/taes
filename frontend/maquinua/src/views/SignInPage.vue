<template>
    <div>
      <h2>Sign In</h2>
      <form @submit.prevent="signIn">
        <div>
          <label for="email">Email:</label><br>
          <input type="email" id="email" v-model="email" required>
        </div>
        <br>
        <div>
          <label for="password">Password:</label><br>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div>
            <br>
          <button type="submit">Sign In</button>
        </div>
      </form>
      <br>
      <p>Do not have an account yet?</p>
      <router-link to="/register">Register</router-link>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      signIn() {
        // Aquí normalmente enviarías estos datos a tu backend para verificar la autenticación
        // Por ahora, solo simularemos el inicio de sesión
        if (this.email === 'test@example.com' && this.password === 'password') {
          // Inicio de sesión exitoso
          // Aquí redirigirías a la página de dashboard si las credenciales son correctas
          this.$router.push('/');
        } else {
          // Mensaje de error en caso de credenciales incorrectas
          alert('Invalid email or password. Please try again.');
        }
      },
    },
  };
  </script>
  