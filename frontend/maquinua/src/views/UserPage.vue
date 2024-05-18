<template>
    <div class="register-container">
    <div class="form-container">
    <div class="user-page">
        <h1> {{  $t("user_page") }}</h1>

        <div class="user-actions" v-if="isLoggedIn">
            <h3> {{  $t("hola") }}, {{ usuario }}</h3>
            
            <router-link class="router-button" to="incidents"> {{  $t("mis_incidencias") }}</router-link> <br>
            <router-link class="router-button" to="user/mydata"> {{  $t("mis_datos") }}</router-link> <br>
            <router-link @click="logout()" to="/"> {{  $t("cerrar_sesion") }}</router-link> <br>
        </div>

        <div v-else>
            <router-link class="router-button" to="/register"> {{  $t("registrate") }}</router-link> <br>
            <router-link class="router-button" to="/signin"> {{  $t("iniciar_sesion") }}</router-link> <br>
        </div>
        
        <router-link class="router-button home" to="/"> {{  $t("inicio") }}</router-link>
    </div>
</div>
</div>
</template>

<script>
    import { useUserStore } from '../stores/user-store-setup';

    export default {
        name: 'UserPage',
        data() {
            return {
                isLoggedIn: false,
                usuario: '',
            };
        },
        created() {
            const userStore = useUserStore();
            try {
                if (userStore.token) {
                    this.isLoggedIn = true;
                    this.usuario = localStorage.getItem('user');
                }
            } catch (error) {
                console.error('Error al decodificar el token:', error);
            }

        },
        methods: {
            logout() {
                try {
                    const userStore = useUserStore();
                    userStore.logout();
                    this.isLoggedIn = false;
                } catch (error) {
                    console.error('Error al cerrar sesión:', error);
                }
            }
        }
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
