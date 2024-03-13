<template>
  <div>
    <h2>Formulario de Registro</h2>
    <form @submit.prevent="submitForm">

      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" v-model="email" />

      <button type="submit">Enviar</button>
    </form>

    <!-- Mostrar el nombre aquí -->
    <p v-if="name">Nombre: {{ name }}</p>
    <p v-if="email">Correo Electrónico: {{ email }}</p>
    <p v-if="bornDate">Fecha de Nacimiento: {{ bornDate }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      name: '', // Nueva propiedad de datos
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

        // Actualizar la propiedad 'name' con la respuesta del servidor
        this.name = response.data.name;
        this.email = response.data.email;
        this.bornDate = response.data.bornDate;
      } catch (error) {
        // Manejar errores, por ejemplo:
        console.error('Error al realizar la solicitud POST:', error);
      }
    },
  },
};
</script>
