<template>
  <div class="register-container">
  <div class="form-container">
    <h2>Modificar Mis Datos</h2>
    <form @submit.prevent="submitForm">
      <!-- Mostrar email -->
      <div>
        <label>Correo Electrónico:</label><br>
        <p>{{ email }}</p>
      </div>

      <!-- Campos modificables -->
      <div>
        <label for="username">Username:</label><br>
        <input type="text" id="username" v-model="username" /><br>
        <span v-if="username === ''" style="color: red;">El nombre de usuario es requerido</span><br><br>

        <label for="name">Nombre:</label><br>
        <input type="text" id="name" v-model="name" /><br>
        <span v-if="name === ''" style="color: red;">El nombre es requerido</span><br><br>

        <label for="surname">Apellido:</label><br>
        <input type="text" id="surname" v-model="surname" /><br>
        <span v-if="surname === ''" style="color: red;">El apellido es requerido</span><br><br>

        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" v-model="password" @click="editPassword" /><br>
        <span v-if="password.length < 6" style="color: red;">La contraseña debe tener al menos 6 caracteres</span><br><br>

        <button type="submit">Guardar cambios</button><br><br>
        
        <!-- Botón para eliminar usuario -->
        <button type="button" @click="confirmDelete" style="background-color: #dc3545; color: white;">Eliminar usuario</button>
      </div>
    </form>
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

import { useUserStore } from '../stores/user-store-setup';

export default {
  data() {
    return {
      username: '',
      initialUsername: '',
      name: '',
      surname: '',
      email: '',
      bornDate: '',
      password: '', // Agrega el campo de la contraseña
      nameValid: false,
      surnameValid: false,
      emailValid: false,
      bornDateValid: false,
      nameDirty: false,
      usernameDirty: false,
      surnameDirty: false,
      emailDirty: false,
      bornDateDirty: false,
    };
  },
  created() {
    const userStore = useUserStore();
    // Aquí obtienes los datos del usuario
    this.email = userStore.uid;

    axios.get(`http://localhost:3000/users/${this.email}`, { withCredentials: true })
      .then((res) => {
        this.name = res.data.name;
        this.surname = res.data.surname;
        this.email = res.data.email;
        this.username = res.data.username;
        this.password = res.data.password; 
        this.initialUsername = res.data.username;
      })
      .catch((error) => {
        console.error('Error al obtener datos del usuario:', error);
      });
  },
  methods: {
    async submitForm() {
      const confirmation = confirm('¿Estás seguro de que deseas actualizar tus datos?');
      
      if (!confirmation) {
        return; // Cancelar si el usuario no confirma
      }

      if (this.validateForm()) {
        try {
          const userStore = useUserStore();
          // Aquí obtienes los datos del usuario
          this.email = userStore.uid;

          await axios.put('http://localhost:3000/users', {
            username: this.username,
            email: this.email,
            name: this.name,
            surname: this.surname,
            password: this.password,
            type: 'user',
          }, { withCredentials: true });

          this.$router.push('/user/mydata');
        } catch (error) {
          console.error('Error al actualizar datos:', error);
        }
      }
    },
    validateForm() {

      if (this.username === '' || this.name === '' || this.surname === '' || this.password.length < 6) {
        return false;
      }

      return true;
    },
    confirmDelete() {
      const userStore = useUserStore();

      const confirmation = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
      if (confirmation) {
        this.deleteUser();
        userStore.logout();
      }else{
        return; // Cancelar si el usuario no confirma
      }
    },
    async deleteUser() {
      try {
        // Lógica para eliminar el usuario
        console.log('Eliminando usuario:', this.email);
        const response2 = await axios.delete(`http://localhost:3000/users/${this.email}`, { withCredentials: true });
        
        alert('Usuario eliminado exitosamente',response2.data);
        this.$router.push('/');
        //algo del session remove
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    },
  },
};
</script>
