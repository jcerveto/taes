<template>
  <div>
    <h2>Mis datos</h2>
    <form @submit.prevent="submitForm">
      <!-- Esto habria que cambiarlo para que directamente lo abra con la session -->
      <h3>Ingrese su correo electrónico para obtener sus datos:</h3>
      <label for="email">Correo Electrónico:</label><br>
      <input type="email" id="email" v-model="email" /><br>

      <br><button type="submit">Enviar</button><br>
    </form>

    <!-- Mostrar las propiedades -->
    <p v-if="name">Nombre: {{ name }}</p>
    <p v-if="surname">Apellido: {{ surname }}</p>
    <p v-if="bornDate">Fecha de Nacimiento: {{ bornDate }}</p>
    <p v-if="email">Correo Electrónico: {{ email }}</p>
    <br>
    <!-- Cambio en el enlace -->
    <router-link class="router-button" to="/myinfo">Modificar Datos</router-link> <br>

    
  </div>
  <br>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      name: '', 
      surname: '', 
      bornDate: '', 
    };
  },
  methods: {
    async submitForm() {
      try {
        // Datos que se enviarán en la solicitud POST
        const postData = {
          email: this.email,
        };

        // Realizar la solicitud POST usando Axios
        const response = await axios.post('http://localhost:3000/users', postData);

        // Actualizar las propiedades con la respuesta del servidor
        this.name = response.data._name;
        this.surname = response.data._surname;
        this.bornDate = response.data._bornDate;
        this.email = response.data._email;
      } catch (error) {
        // Manejar errores, por ejemplo:
        console.error('Error al realizar la solicitud POST:', error);
      }
    },
  },
};
</script>
