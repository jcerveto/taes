<template>
  <div>
    <h2>Modificar Mis Datos</h2>
    <form @submit.prevent="submitForm">
      <!-- Mostrar email -->
      <div>
        <label>Correo Electrónico:</label><br>
        <p>{{ email }}</p>
      </div>

      <!-- Campos modificables -->
      <div>
        <label for="username">Usuario:</label><br>
        <input type="text" id="username" v-model="username" /><br><br>

        <label for="name">Nombre:</label><br>
        <input type="text" id="name" v-model="name" /><br><br>

        <label for="surname">Apellido:</label><br>
        <input type="text" id="surname" v-model="surname" /><br><br>

        <label for="surname">Pasword:</label><br>
        <input type="password" id="password" v-model="password" /><br><br>

        <button type="submit">Guardar Cambios</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      name: '',
      surname: '',
      email: '',
      bornDate: '',
      nameValid: false,
      surnameValid: false,
      emailValid: false,
      bornDateValid: false,
      nameDirty: false,
      surnameDirty: false,
      emailDirty: false,
      bornDateDirty: false,
    };
  },
  created() {
    // Simulando la obtención de datos del usuario
    this.getUserData();
  },
  methods: {
    async getUserData() {
      // FALTARÍA AÑADIR EL SESSION TOKEN    
      this.email = 'test@example.com';
      await axios.post('http://localhost:3000/users', { email: this.email }, { withCredentials: true })
        .then((res) => {
          this.name = res.data.name;
          this.surname = res.data.surname;
          this.email = res.data.email;
          this.username = res.data.username;
          this.password = res.data.password;
        })
        .catch((error) => {
          console.error('Error al obtener datos del usuario:', error);
        });
    },
    async submitForm() {
      const confirmation = confirm('¿Estás seguro de que deseas actualizar tus datos?');
      if (!confirmation) {
        return; // Cancelar si el usuario no confirma
      }

      try {
        /*const updatedFields = {
          username: this.username,
          name: this.name,
          email: this.email,
          surname: this.surname,
        };   */ 
        const response = await axios.put('http://localhost:3000/users', {username: this.username , email: this.email, name: this.name,surname: this.surname, password: this.password}, { withCredentials: true });    
        console.log('Datos actualizados:', response.data);

        this.$router.push('/user/mydata');
      } catch (error) {
        console.error('Error al actualizar datos:', error);
      }
    },
  },
};
</script>
