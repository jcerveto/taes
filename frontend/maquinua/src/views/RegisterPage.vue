<template>
    <div class="register-container">
      <div class="form-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div class>
          <label for="username">Username:</label><br>
          <input type="text" id="username" v-model="username" required>
          <br><span v-if="!usernameValid && usernameDirty" style="color: red;">Please enter a valid username</span>
        </div>
        <div><br>
          <label for="name">Name:</label><br>
          <input type="text" id="name" v-model="name" required>
          <br><span v-if="!nameValid && nameDirty" style="color: red;">Please enter a valid name</span>
        </div>
        <div><br>
          <label for="surname">Surname:</label><br>
          <input type="text" id="surname" v-model="surname" required>
          <br><span v-if="!surnameValid && surnameDirty" style="color: red;">Please enter a valid surname</span>
        </div>
        <div><br>
          <label for="email">Email:</label><br>
          <input type="email" id="email" v-model="email" required>
          <br><span v-if="!emailValid && emailDirty" style="color: red;">Please enter a valid email address</span>
        </div>
  
        <div><br>
          <label for="birthdate">Birthdate:</label><br>
          <input type="date" v-model="birthdate" id="birthdate" name="Birthdate" min="1924-01-01" :max="maxDate" />

          <span v-if="!birthdateValid && birthdateDirty" style="color: red;">Please select a valid birthdate (you must be 16 years)</span>
        </div>
  
        <div><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" v-model="password" required>
          <br><span v-if="!passwordValid && passwordDirty" style="color: red;">Please enter a valid password (min 6 characters)</span>
        </div>
        <div><br>
          <label for="repeatPassword">Repeat Password:</label><br>
          <input type="password" id="repeatPassword" v-model="repeatPassword" required>
          <br><span v-if="!repeatPasswordValid && repeatPasswordDirty" style="color: red;">Passwords do not match</span>
        </div>
        <div><br>
          <button type="submit" >Register</button>
        </div>
      </form><br>
      <br>
      <p>Do you have an account?</p>
      <router-link to="/signin">Sign In</router-link>
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
        name: '',
        surname: '',
        email: '',
        birthdate: '',
        password: '',
        repeatPassword: '',
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
          };

          await axios.post('http://localhost:3000/users', { email : this.email})
            .then((res) => {
              if (res.data.email === this.email) {
                alert('Email already exists. Please try again.');
              }

              if (res.data.username === this.username) {
                alert('Username already exists. Please try again.');
              }
            }).catch(() => {
              // Realizar la solicitud POST usando Axios
              const response = axios.post('http://localhost:3000/user', userData);
              
              console.log(response.data);
              
              this.$router.push('/');
            });



          
        } else {
          console.log('ERROR. Please, review the data.');
        }
      },
    },
  };
  </script>
  