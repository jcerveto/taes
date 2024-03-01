<template>
    <!-- 
        FALTA: añadir un validador de si el usuario ha iniciado sesión, si no lo ha hecho hay que enviarle a LOGIN.

        TO-DO: cuando tengamos la base de datos funcionando y podamos obtener los datos
    -->
    <div class="user-page">
        <h1>User Page</h1>

        <user-info :user="user" />
        <h3> Hola, {{ "usuario" }}</h3>

        <div class="user-actions">
            <router-link class="router-button" to="/favourites">Favoritos</router-link> <br>
            <router-link class="router-button" to="/userstatistics">Estadísticas</router-link> <br>
            <router-link class="router-button" to="/myreviews">Mis Reseñas</router-link> <br>
            <router-link class="router-button" to="/myconsults">Mis Consultas</router-link> <br>
            <router-link class="router-button" to="/mylocations">Mis Ubicaciones</router-link> <br>
            <router-link class="router-button" to="/mydata">Mis Datos</router-link> <br>
        </div>

        <router-link class="router-button home" to="/">Go to Home</router-link>
    </div>
</template>

<script>
    // Intento de pasar un objeto user para recibir el nombre
    export default {
        name: 'UserPage',
        props: {
            user: {
            type: Object,
            required: true,
            },
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
</style>
