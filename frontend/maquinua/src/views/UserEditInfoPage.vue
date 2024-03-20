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
          <label for="name">Usuario::</label><br>
          <input type="text" id="username" v-model="username" /><br><br>

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
            this.bornDate = res.data.bornDate;
            this.username = res.data.username;
          })
          .catch((error) => {
            console.error('Error al obtener datos del usuario:', error);
          });
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
            const userData = {
              name: this.name,
              surname: this.surname,
              email: this.email,
              bornDate: this.bornDate,
              username: this.username,
            };    
            const response = await axios.put('http://localhost:3000/user', userData);    
            console.log('Datos actualizados:', response.data);
    
            this.$router.push('/user/mydata');
          } catch (error) {
            console.error('Error al actualizar datos:', error);
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
  