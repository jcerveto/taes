<template>
    <div>
        <header>
            <img src="./../assets/LogoMaquinUA.jpg"
                 width="130" height="130" />
            <h1>MaquinUA</h1>
        </header>
        <section>
            <h2>Sobre nosotros</h2>
            <p>Esta pagina esta dedicada a la ubicación y busqueda de productos mediante un mapa iteractivo de maquinas expendedoras en la Universidad de Alicante </p>
        </section>
        <section>
            <h2>Nuestra mision</h2>
            <p>Nuestra mision es  facilitar el acceso a las distintos usuarios de la universidad de Alicante el acceso a todo tipo de maquinas expendedoras que cumpla con sus necesidades</p>
        </section>
        <!-- </div>
    <div class="comment-box">
        <h2>Comentarios</h2>

    <ul>
        <li v-for="palabra in palabras" :key="palabra">{{ palabra }}</li>
    </ul>
    <ul>

        <li v-for="(comment, index) in comments" :key="index">
            {{ comment }}
        </li>
    </ul>

    Formulario para agregar un comentario
    <form @submit.prevent="addComment">
        <textarea v-model="newComment" placeholder="Escribe tu comentario"></textarea>
        <button type="submit">Agregar Comentario</button>
    </form>-->
    </div>
    <footer>
        <h3>Contacto</h3>
        <p>644344244</p>
        <p>cgmg3@alu.ua.es</p>
        <router-link to="/">Go to Home</router-link>
    </footer>


</template>


   


<style scoped> 
    .about {
        font-family: Arial, sans-serif;
    }

    header {
        background-color: #fff;
        color: #333;
        padding: 20px;
        text-align: center;
    }

    section {
        padding: 20px;
    }

    h1, h2 {
        color: #333;
    }
    .comment-box {
        
        padding: 20px;
        margin: 20px 0;
    }
    .palabra {
        border: 1px solid #000;
        padding: 10px;
        margin-bottom: 10px;
    }

    textarea {
        width: 100%;
        margin-bottom: 10px;
    }

    footer {
        background-color: #fff;
        color: #333;
        text-align: center;
        padding: 10px;
    }
</style>  