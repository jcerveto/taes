<template>
    <div class="register-container">
      <div class="form-container">
          <h2>{{  $t("registro") }}</h2>
      <br>
      <form @submit.prevent="register">
        <div class>
            <label for="username">{{  $t("usuario") }}:</label><br>
          <input class="form-control" type="text" id="username" v-model="username" required>
          <br><span v-if="!usernameValid && usernameDirty" style="color: red;">{{  $t("no_valida_usuario") }}</span>
        </div>
        <div>
          <label for="name">Name:</label><br>
          <input class="form-control" type="text" id="name" v-model="name" required>
          <br><span v-if="!nameValid && nameDirty" style="color: red;">{{  $t("no_valida_nombre") }}</span>
        </div>
        <div>
          <label for="surname">Surname:</label><br>
          <input class="form-control" type="text" id="surname" v-model="surname" required>
          <br><span v-if="!surnameValid && surnameDirty" style="color: red;">{{  $t("no_valida_apellido") }}</span>
        </div>
        <div>
            <label for="email">{{  $t("correo_electronico") }}:</label><br>
          <input class="form-control" type="email" id="email" v-model="email" required>
          <br><span v-if="!emailValid && emailDirty" style="color: red;">{{  $t("no_valida_email") }}</span>
          {{ emailExists }}
        </div>
  
        <div>
            <label for="birthdate">{{  $t("cumple") }}:</label><br>
          <input class="form-control" type="date" v-model="birthdate" id="birthdate" name="Birthdate" min="1924-01-01" :max="maxDate" />

          <span v-if="!birthdateValid && birthdateDirty" style="color: red;">{{  $t("no_valida_edad") }}</span>
        </div>
  
        <div><br>
             <label for="password">{{  $t("contrasenya") }}:</label><br>
          <input class="form-control" type="password" id="password" v-model="password" required>
          <br><span v-if="!passwordValid && passwordDirty" style="color: red;">{{  $t("no_valida_con") }}</span>
        </div>
        <div>
            <label for="repeatPassword">{{  $t("rep_contrasenya") }}:</label><br>
          <input class="form-control" type="password" id="repeatPassword" v-model="repeatPassword" required>
          <br><span v-if="!repeatPasswordValid && repeatPasswordDirty" style="color: red;">{{  $t("no_coinciden") }}</span>
        </div>
        <div>
            <button class="custom-btn-color btn" type="submit">{{  $t("registrarse") }}</button>
        </div>
      </form><br>
      
      <p>{{  $t("tienes_cuenta") }}</p>
      <router-link to="/signin">{{  $t("inicio_sesion") }}</router-link>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { useUserStore } from '../stores/user-store-setup';

  export default {
    data() {
      return {
        username: '',
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        password: '',
        repeatPassword: '',
        type: '',
        days: Array.from({ length: 31 }, (_, index) => index + 1),
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        years: Array.from({ length: 100 }, (_, index) => new Date().getFullYear() - index),
        usernameValid: false,
        nameValid: false,
        surnameValid: false,
        emailValid: false,
        birthdateValid: false,
        passwordValid: false,
        repeatPasswordValid: false,
        usernameDirty: false,
        nameDirty: false,
        surnameDirty: false,
        emailDirty: false,
        birthdateDirty: false,
        passwordDirty: false,
        repeatPasswordDirty: false,
      };
    },
    computed: {
      formValid() {
        return this.usernameValid && this.nameValid && this.surnameValid && this.emailValid && this.birthdateValid && this.passwordValid && this.repeatPasswordValid;
      },
        maxDate() {
          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1;
          let dd = today.getDate();

          if (mm < 10) {
            mm = '0' + mm;
          }

          if (dd < 10) {
            dd = '0' + dd;
          }

          return (yyyy-'16') + '-' + mm + '-' + dd;
        }
    },
    methods: {
      validateUsername() {
        this.usernameDirty = true;
        this.usernameValid = /^[a-zA-Z0-9]+$/.test(this.username);
      },
      validateName() {
        this.nameDirty = true;
        this.nameValid = /^[a-zA-Z\s]+$/.test(this.name);
      },
      validateSurname() {
        this.surnameDirty = true;
        this.surnameValid = /^[a-zA-Z\s]+$/.test(this.surname);
      },
      validateEmail() {
        this.emailDirty = true;
        this.emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
      },
      validateBirthdate() {
        this.birthdateDirty = true;
        this.birthdateValid = this.selectedDate !== '';
      },
      
      validatePassword() {
        this.passwordDirty = true;
        this.passwordValid = this.password.length >= 6;
      },
      validateRepeatPassword() {
        this.repeatPasswordDirty = true;
        this.repeatPasswordValid = this.password === this.repeatPassword;
      },
      async register() {
        this.validateUsername();
        this.validateName();
        this.validateSurname();
        this.validateEmail();
        this.validateBirthdate();
        this.validatePassword();
        this.validateRepeatPassword();
  
        
        if (this.formValid) {
          //simular registro falta enviar a backend
          const userData = {
            username: this.username,
            name: this.name,
            surname: this.surname,
            email: this.email,
            bornDate: this.birthdate,
            password: this.password,
            type: 'user',
          };      

          // Realizar la solicitud POST usando Axios
          try {
            const response = await axios.post('http://localhost:3000/register', userData, {
              withCredentials: true,
            });

            console.log(response.data);

            const userStore = useUserStore();

            userStore.access(this.email, this.password);
            
            this.$router.push('/');
          } catch (error) {
            alert("User already exists");
          }
          
        } else {
          console.log('ERROR. Please, review the data.');
        }
      },
    },
  };
</script>
  

<style scoped>
  .register-container {
    background-image: url('~@/assets/backgroundhd.png'); /* Ruta a tu imagen de fondo */
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
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  }


  .custom-btn-color {
    text-align: center;
    color: white;
    background-color: #7fcaad;
  }
  
  .custom-btn-color:hover {
    color: white;
    background-color: #5a917b;
  }
</style>