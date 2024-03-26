<template>
    <div class="register-container">
      <div class="form-container">
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
  </div>
 
    
  </template>
  
  <style>
  .register-container {
    background-image: url('~@/assets/background.png'); /* Ruta a tu imagen de fondo */
    background-size: cover;
    background-position: center;
    height: 100%; /* Ajusta la altura según tu necesidad */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }

  .form-container {
    background-color: rgb(255, 255, 255);
    padding: 20px;
    border-radius: 10px;
  }
</style>

  <script>
  import axios from 'axios';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async signIn() {
        // Aquí normalmente enviarías estos datos a tu backend para verificar la autenticación
        // Datos que se enviarán en la solicitud POST

        // Realizar la solicitud POST usando Axios (pedimos al backend que nos devuelva ese usuario)
        await axios.post('http://localhost:3000/users', { email: this.email }, { withCredentials: true })
          .then((res) => {
            if (res.data.password === this.password && res.data.email === this.email) {
            // Inicio de sesión exitoso
            
            alert("Correcto")
            
            Cookies.get('tokenDeSesion');

            this.$router.push('/user');
          } else {
            // Mensaje de error en caso de credenciales incorrectas
            alert('Invalid email or password. Please try again.');
          }})
          .catch((error) => {
            alert('Invalid email or password. Please try again.');

            // Reload the page
            location.reload();

            console.error(error);
          });

        
      },
    },
  };
  </script>
  