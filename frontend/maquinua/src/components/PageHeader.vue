<template>
    <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/filter">Filter</router-link>
        <router-link to="/products">View products</router-link>
        <router-link to="/machines">View machines</router-link>
        <router-link to="/about">About</router-link>
        <button v-if="!isLoggedIn" @click="redirectToSignIn">Sign In</button>
        <button id="toggleDarkMode">Dark Mode</button>
        <img v-if="isLoggedIn" src="ruta/a/la/foto-de-perfil.jpg" alt="User Profile" id="userProfile">
    </nav>
</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    redirectToSignIn() {
      // Aquí puedes redirigir usando Vue Router
      this.$router.push('/signin'); // Reemplaza '/signin' con la ruta a tu página de inicio de sesión
    },
    checkLoggedIn() {
      // Lógica para comprobar si el usuario está autenticado
      // Podría ser una llamada a una API, verificación de tokens, etc.
      // Aquí lo simulamos con un simple ejemplo
      const userLoggedIn = /* Aquí tu lógica para comprobar si está autenticado */
      this.isLoggedIn = userLoggedIn;
    },
  },
  
};
</script>

<style scoped>

nav {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background-color: #f1f1f1;
    padding: 50px;

}

nav a {
    text-decoration: none;
    padding: 10px;
    color: black;   
}

nav a:hover {
    background-color: #ddd;
}

</style>