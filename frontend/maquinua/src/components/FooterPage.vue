<template>
    <footer :class="{ 'dark-mode': darkMode }">
      <p class="footer-text">© 2024 - Universitat d'Alacant </p>
      <p class="footer-text">Current language: {{ language }}</p>
    </footer>
  </template>
  
  <script>
  export default {
    inject: ['language'],
    name: 'FooterPage',
    props: {
      darkMode: {
        type: Boolean,
        default: false
      }
    }
  };
  </script>
  
  <style scoped>
  footer {
    background-color: #f1f1f1;
    color: black;
  }
  
  .dark-mode footer {
    background-color: #333;
    color: white;
  }
  </style>
  