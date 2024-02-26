<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label><br>
          <input type="text" id="username" v-model="username" required>
          <span v-if="!usernameValid && usernameDirty" style="color: red;">Please enter a valid username</span>
        </div>
        <div><br>
          <label for="name">Name:</label><br>
          <input type="text" id="name" v-model="name" required>
          <span v-if="!nameValid && nameDirty" style="color: red;">Please enter your name</span>
        </div>
        <div><br>
          <label for="surname">Surname:</label><br>
          <input type="text" id="surname" v-model="surname" required>
          <span v-if="!surnameValid && surnameDirty" style="color: red;">Please enter your surname</span>
        </div>
        <div><br>
          <label for="email">Email:</label><br>
          <input type="email" id="email" v-model="email" required>
          <span v-if="!emailValid && emailDirty" style="color: red;">Please enter a valid email address</span>
        </div>
  
        <div><br>
          <label for="birthdate">Birthdate:</label><br>
          <select v-model="selectedDay" id="day" required>
            <option value="" disabled>Select Day</option>
            <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
          </select>
          <select v-model="selectedMonth" id="month" required>
            <option value="" disabled>Select Month</option>
            <option v-for="(month, index) in months" :key="index" :value="index + 1">{{ month }}</option>
          </select>
          <select v-model="selectedYear" id="year" required>
            <option value="" disabled>Select Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
          <span v-if="!birthdateValid && birthdateDirty" style="color: red;">Please select a valid birthdate</span>
          <span v-if="!ageValid && birthdateValid && birthdateDirty" style="color: red;">You must be at least 16 years old</span>
        </div>
  
        <div><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" v-model="password" required>
          <span v-if="!passwordValid && passwordDirty" style="color: red;">Please enter a password (min 6 characters)</span>
        </div>
        <div><br>
          <label for="repeatPassword">Repeat Password:</label><br>
          <input type="password" id="repeatPassword" v-model="repeatPassword" required>
          <span v-if="!repeatPasswordValid && repeatPasswordDirty" style="color: red;">Passwords do not match</span>
        </div>
        <div><br>
          <button type="submit" :disabled="!formValid">Register</button>
        </div>
      </form><br>
      <br>
      <p>Do you have an account?</p>
      <router-link to="/signin">Sign In</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        name: '',
        surname: '',
        email: '',
        selectedDay: '',
        selectedMonth: '',
        selectedYear: '',
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
        ageValid: false,
        usernameDirty: false,
        nameDirty: false,
        surnameDirty: false,
        emailDirty: false,
        birthdateDirty: false,
        passwordDirty: false,
        repeatPasswordDirty: false,
        minAge: 16, // Edad mínima permitida
      };
    },
    computed: {
      formValid() {
        return this.usernameValid && this.nameValid && this.surnameValid && this.emailValid && this.birthdateValid && this.passwordValid && this.repeatPasswordValid && this.ageValid;
      },
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
        this.birthdateValid = this.selectedDay && this.selectedMonth && this.selectedYear;
        if (this.birthdateValid) {
          this.calculateAge();
          this.validateAge();
        }
      },
      calculateAge() {
        const birthdate = new Date(`${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`);
        const ageDiffMs = Date.now() - birthdate.getTime();
        const ageDate = new Date(ageDiffMs); 
        this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      },
      validateAge() {
        this.ageValid = this.age >= this.minAge;
      },
      validatePassword() {
        this.passwordDirty = true;
        this.passwordValid = this.password.length >= 6;
      },
      validateRepeatPassword() {
        this.repeatPasswordDirty = true;
        this.repeatPasswordValid = this.password === this.repeatPassword;
      },
      register() {
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
            birthdate: `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`,
            password: this.password,
          };
          
          // Aquí puedes hacer algo con los datos, como enviarlos a una API
          console.log('User Data:', userData);
          
          this.$router.push('/');
        } else {
          console.log('ERROR. Please, review the data.');
        }
      },
    },
  };
  </script>
  