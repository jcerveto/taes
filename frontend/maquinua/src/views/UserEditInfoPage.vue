<template>
    <div>
      <h2>Modificar Mis Datos</h2>
      <form @submit.prevent="submitForm">
        <!-- Mostrar email -->
        <div>
          <label>Correo Electrónico:</label><br>
          <p>{{ email }}</p>
        </div>
    
        <!-- Mostrar username -->
        <div>
          <label>Username:</label><br>
          <p>{{ username }}</p>
        </div>
    
        <!-- Campos modificables -->
        <div>
          <label for="name">Nombre:</label><br>
          <input type="text" id="name" v-model="name" /><br><br>
    
          <label for="surname">Apellido:</label><br>
          <input type="text" id="surname" v-model="surname" /><br><br>
    
          <label for="bornDate">Fecha de Nacimiento:</label><br>
          <input type="date" id="bornDate" v-model="bornDate" /><br><br>
    
          <button type="submit" @click="confirmUpdate">Guardar Cambios</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  //import axios from 'axios';
  
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
        // En este ejemplo, simulamos datos de usuario
        this.name = 'John';
        this.surname = 'Doe';
        this.email = 'johndoe@example.com';
        this.bornDate = '1990-01-01';
        this.username = 'johndoe123'; // Suponiendo que también obtienes el username del usuario
      },
      async submitForm() {
        // Realizar validaciones antes de enviar los datos
        this.validateName();
        this.validateSurname();
        this.validateBornDate();
    
        if (this.nameValid && this.surnameValid && this.bornDateValid) {
          const confirmation = confirm('¿Estás seguro de que deseas actualizar tus datos?');
          if (!confirmation) {
            return; // Cancelar si el usuario no confirma
          }
    
          try {
            /*const userData = {
              name: this.name,
              surname: this.surname,
              email: this.email,
              bornDate: this.bornDate,
            };*/
    
            // Aquí realizarías una solicitud PUT o PATCH a tu API para actualizar los datos del usuario
            // Por simplicidad, este ejemplo usa una solicitud POST
            //const response = await axios.post('http://localhost:3000/update-user', userData);
    
            //console.log('Datos actualizados:', response.data);
    
            this.$router.push('/user/mydata');
          } catch (error) {
            console.error('Error al actualizar datos:', error);
            // Opcional: mostrar un mensaje de error
          }
        } else {
          console.log('Por favor, completa todos los campos correctamente.');
        }
      },
      confirmUpdate() {
        const confirmation = confirm('¿Estás seguro de que deseas actualizar tus datos?');
        if (confirmation) {
          this.submitForm(); // Si el usuario confirma, enviar los datos
        }
      },
      validateName() {
        this.nameDirty = true;
        this.nameValid = /^[a-zA-Z\s]+$/.test(this.name);
      },
      validateSurname() {
        this.surnameDirty = true;
        this.surnameValid = /^[a-zA-Z\s]+$/.test(this.surname);
      },
      validateBornDate() {
        this.bornDateDirty = true;
        this.bornDateValid = this.bornDate !== '';
      },
    },
  };
  </script>
  