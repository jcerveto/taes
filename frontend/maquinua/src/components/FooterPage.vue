<template>
    <footer :class="{ 'dark-mode': darkMode }">
      <p class="footer-text">© 2024 - Universitat d'Alacant </p>
      <p class="footer-text">
        {{  $t("greeting") }}
        {{ $t("description-1") }} 
      </p>
      <p class="footer-text">
        {{ $t("find-us") }}
        <a 
          href="https://github.com/jcerveto/taes" 
          target="_blank">https://github.com/jcerveto/taes
        </a>
        . 
      </p>
    </footer>
  </template>
  
  <script>
  export default {
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
  