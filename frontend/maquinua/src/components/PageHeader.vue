<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/" @click="ToggleFiltros()">Filter</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">View products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/machines">View machines</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user">User</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/support">Support</router-link>
          </li>
        </ul>
      </div>

      <div class="d-flex">
        
        <button 
          class="navbar-toggler ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="dark-mode-button">
          <i id="toggleDarkMode" class="bi-moon"></i>
        </div>
      </div>
    </div>
  </nav>

  <div class="filtros-overlay" v-if="filtros">
    <FiltrosMapa />
  </div>
</template>


<style scoped>

  nav {
    display: flex;
    justify-content: space-between;
    background-color: #f1f1f1;
  }

  nav a {
    text-decoration: none;
    padding: 10px;
    color: black;   
  }

  nav a:hover {
    background-color: #ddd;
  }

  .dark-mode-button {
    font-size: 1.5rem;
    cursor: pointer;
    color: #000;

    /* center vertically */
    display: flex;
    align-items: center;
  }

  .filtros-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); 
    z-index: 999;
    
  }

</style>

<script>
import FiltrosMapa from './FiltrosMapa.vue';
  export default {
    name: 'PageHeader',
    components:{
      FiltrosMapa
    },
    data() {
      return {
        darkMode: false,
        filtros: false,
      }
    },
    methods: {
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
          document.body.classList.add('dark-mode');
          document.getElementById('toggleDarkMode').classList.replace('bi-moon', 'bi-sun');
        } else {
          document.body.classList.remove('dark-mode');
          document.getElementById('toggleDarkMode').classList.replace('bi-sun', 'bi-moon');
        }
      },
      ToggleFiltros(){
        this.filtros = !this.filtros;
      }
    },
    mounted() {
      document.getElementById('toggleDarkMode').addEventListener('click', this.toggleDarkMode);
    }
  }
</script>