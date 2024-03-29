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
        <label for="username">Usuario:</label><br>
        <input type="text" id="username" v-model="username" @click="editField('username')" /><br>
        <span v-if="username === '' && usernameDirty" style="color: red;">El nombre de usuario es requerido</span><br><br>

        <label for="name">Nombre:</label><br>
        <input type="text" id="name" v-model="name" @click="editField('name')" /><br>
        <span v-if="name === '' && nameDirty" style="color: red;">El nombre es requerido</span><br><br>

        <label for="surname">Apellido:</label><br>
        <input type="text" id="surname" v-model="surname" @click="editField('surname')" /><br>
        <span v-if="surname === '' && surnameDirty" style="color: red;">El apellido es requerido</span><br><br>

        <label for="password">Contraseña:</label><br>
        <input type="password" id="password" v-model="password" @click="editPassword" /><br>
        <span v-if="password.length < 6" style="color: red;">La contraseña debe tener al menos 6 caracteres</span><br><br>

        <button type="submit">Guardar Cambios</button><br><br>
        
        <!-- Botón para eliminar usuario -->
        <button type="button" @click="confirmDelete" style="background-color: #dc3545; color: white;">Eliminar Usuario</button>
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
      surnameDirty: false,
      emailDirty: false,
      bornDateDirty: false,
    };
  },
  created() {
    this.getUserData();
  },
  methods: {
    async getUserData() {
      // Aquí obtienes los datos del usuario
      this.email = 'test@example.com';
      await axios.post('http://localhost:3000/users', { email: this.email }, { withCredentials: true })
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
    async submitForm() {
      const confirmation = confirm('¿Estás seguro de que deseas actualizar tus datos?');
      if (!confirmation) {
        return; // Cancelar si el usuario no confirma
      }

      if (this.validateForm()) {
        try {
          await axios.post('http://localhost:3000/users', { email: this.email }, { withCredentials: true })
            .then((res) => {
              if(this.username === res.data.username){
                alert('El nombre de usuario ya existe. Por favor, elige otro.');
                this.$router.push('/user/mydata/myinfo');
                return;
              }
            })
            .catch((error) => {
              console.error('Error al obtener datos del usuario:', error);
            });

          const response = await axios.put('http://localhost:3000/users', {
            username: this.username,
            email: this.email,
            name: this.name,
            surname: this.surname,
            password: this.password 
          }, { withCredentials: true });

          console.log('Datos actualizados:', response.data);
          this.$router.push('/user/mydata');
        } catch (error) {
          console.error('Error al actualizar datos:', error);
        }
      }
    },
    editPassword() {
      // Este método se llama al hacer clic en el campo de contraseña
      const newPassword = prompt('Introduce tu nueva contraseña:');
      if (newPassword && newPassword.length >= 6) {
        this.password = newPassword;
      } else {
        alert('La contraseña debe tener al menos 6 caracteres');
      }
    },
    editField(field) {
      // Método para editar los campos de nombre, apellido y usuario
      let newValue = prompt(`Introduce tu nuevo ${field}:`);
      if (newValue) {
        // Actualizar el valor solo si se ingresó un valor
        switch (field) {
          case 'username':
            this.username = newValue;
            break;
          case 'name':
            this.name = newValue;
            break;
          case 'surname':
            this.surname = newValue;
            break;
          default:
            break;
        }
      } else {
        alert(`El ${field} no puede estar vacío`);
      }
    },
    validateForm() {
      this.usernameDirty = true;
      this.nameDirty = true;
      this.surnameDirty = true;

      if (this.username === '' || this.name === '' || this.surname === '' || this.password.length < 6) {
        return false;
      }

      return true;
    },
    confirmDelete() {
      const confirmation = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
      if (confirmation) {
        this.deleteUser();
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
