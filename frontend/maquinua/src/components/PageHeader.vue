<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Home</router-link>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/filter">Filter</router-link>
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

</style>

<script>
  export default {
    name: 'PageHeader',
    data() {
      return {
        darkMode: false
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
      }
    },
    mounted() {
      document.getElementById('toggleDarkMode').addEventListener('click', this.toggleDarkMode);
    }
  }
</script>