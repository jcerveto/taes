<template>
    <div class="register-container">
    <div class="form-container">
    <div class="user-page">
        <h1>User Page</h1>

        <div class="user-actions" v-if="isLoggedIn">
            <user-info :user="user" />
            <h3> Hola, {{ usuario }}</h3>
            
            <router-link class="router-button" to="user/favourites">Favoritos</router-link> <br>
            <router-link class="router-button" to="user/userstatistics">Estadísticas</router-link> <br>
            <router-link class="router-button" to="user/myreviews">Mis Reseñas</router-link> <br>
            <router-link class="router-button" to="user/myconsults">Mis Consultas</router-link> <br>
            <router-link class="router-button" to="user/mylocations">Mis Ubicaciones</router-link> <br>
            <router-link class="router-button" to="user/mydata">Mis Datos</router-link> <br>
        </div>

        <div v-else>
            <router-link class="router-button" to="/register">REGISTER</router-link> <br>
            <router-link class="router-button" to="/signin">SIGN IN</router-link> <br>
        </div>

        <router-link class="router-button home" to="/">Go to Home</router-link>
    </div>
</div>
</div>
</template>

<script>
    import Cookies from 'js-cookie';
    import { jwtDecode } from 'jwt-decode';

    export default {
        name: 'UserPage',
        props: {
            user: {
            type: Object,
            required: true,
            },
        },
        data() {
            return {
                isLoggedIn: false,
                usuario: '',
            };
        },
        created() {
            
            this.isLoggedIn = !!Cookies.get('tokenDeSesion') ;
            
            try {
                const tokenDeSesion = localStorage.getItem("tokenDeSesion");
                const decodedToken = jwtDecode(tokenDeSesion, 'secreto');
                this.usuario = decodedToken.name;
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }

        },
    };
</script>


<style scoped>
    .router-button {
        display: inline-block;
        padding: 10px 20px;
        margin: 5px;
        background-color: #f0f0f0; /* Gris claro */
        color: #333; /* Color de texto oscuro */
        text-decoration: none;
        border: 1px solid #ccc; /* Borde del botón */
        border-radius: 5px;
        transition: background-color 0.3s ease;
    }

    .home {
        background-color: red;
        color: white;
    }

    .router-button:hover {
        background-color: #ddd; /* Cambio de color al pasar el ratón */
    }
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
